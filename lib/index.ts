import { IGuideSettings } from './IGuideSettings';
import { IGuideDetail } from './IGuideDetail';
import {
	ITourGuide,
	IFocusFactor,
	IGuideContent,
	IFocusDisplacement,
	IAppTourGuide,
	IPageTourGuide
} from './ITourGuide';
import './index.css';

export class TapTarget {
	private static readonly ttClassName: string = 'taptarget';
	private static readonly spaceClassName: string = 'taptarget-space';
	private static readonly titleClassName: string = 'taptarget-title';
	private static readonly descriptionClassName: string = 'taptarget-description';
	private static readonly okayBtnClassName: string = 'taptarget-okay-btn';
	private static readonly contentClassName: string = 'taptarget-content';
	private static readonly plainMsgClassName: string = 'taptarget-plain-message';
	private static readonly targetClassName: string = 'taptarget-target';
	private static readonly targetOuterClassName: string = 'taptarget-target-outer';
	private static readonly hiddenClassName: string = 'taptarget-hidden';
	private static readonly activeClassName: string = 'taptarget-active';

	private currentGuide: IGuideDetail;
	private body: HTMLElement;
	private taptarget: HTMLElement;
	private space: HTMLElement;
	private content: HTMLElement;
	private title: HTMLElement;
	private desc: HTMLElement;
	private okayBtn: HTMLElement;
	private target: HTMLElement;
	private targetOuter: HTMLElement;
	private resolve: (value?: {} | PromiseLike<{}>) => void;

	constructor(private config?: IGuideSettings) {
		this.configure();
		this.prepare();
	}

	private configure() {
		this.config = this.config || {};
		this.config.spaceWidth = this.config.spaceWidth || Math.min(window.innerWidth * 2.2, 1000);
		let docStyle = document.documentElement.style;

		if (this.config.targetOuterWidth) {
			docStyle.setProperty('--targetOuterWidth', this.config.targetOuterWidth + 'px');
		}
		if (this.config.targetOuterGrowScale) {
			docStyle.setProperty('--targetOuterGrowScale', this.config.targetOuterGrowScale + '');
		}
		if (this.config.targetOuterBoomWidth) {
			docStyle.setProperty('--targetOuterBoomWidth', this.config.targetOuterBoomWidth + 'px');
		}
		if (this.config.duration) {
			docStyle.setProperty('--duration', this.config.duration + 's');
		}
		if (this.config.spaceWidth) {
			docStyle.setProperty('--spaceWidth', this.config.spaceWidth + 'px');
		}
		if (this.config.zIndex) {
			docStyle.setProperty('--zIndex', this.config.zIndex + '');
		}
		if (this.config.spaceColor) {
			docStyle.setProperty('--spaceColor', this.config.spaceColor);
		}
		if (this.config.spaceShadowColor) {
			docStyle.setProperty('--spaceShadowColor', this.config.spaceShadowColor);
		}
		if (this.config.titleColor) {
			docStyle.setProperty('--titleColor', this.config.titleColor);
		}
		if (this.config.descriptionColor) {
			docStyle.setProperty('--descriptionColor', this.config.descriptionColor);
		}
	}

	private prepare() {
		if (!this.taptarget) {
			this.body = document.getElementsByTagName('body').item(0);
			if (this.body.className.indexOf(TapTarget.activeClassName) < 0) {
				this.body.className += ' ' + TapTarget.activeClassName;
			}

			this.taptarget = document.createElement('div');
			this.taptarget.className = TapTarget.ttClassName + ' ' + TapTarget.hiddenClassName;
			document.body.appendChild(this.taptarget);

			this.space = document.createElement('div');
			this.space.className = TapTarget.spaceClassName;
			this.taptarget.appendChild(this.space);

			this.content = document.createElement('div');
			this.content.className = TapTarget.contentClassName;
			this.taptarget.appendChild(this.content);

			this.title = document.createElement('div');
			this.title.className = TapTarget.titleClassName;
			this.content.appendChild(this.title);

			this.desc = document.createElement('div');
			this.desc.className = TapTarget.descriptionClassName;
			this.content.appendChild(this.desc);

			this.okayBtn = document.createElement('button');
			this.okayBtn.className = TapTarget.okayBtnClassName + ' ' + TapTarget.hiddenClassName;
			this.content.appendChild(this.okayBtn);

			this.target = document.createElement('div');
			this.target.className = TapTarget.targetClassName;
			this.taptarget.appendChild(this.target);

			this.targetOuter = document.createElement('div');
			this.targetOuter.className = TapTarget.targetOuterClassName;
			this.taptarget.appendChild(this.targetOuter);
		}
	}

	onTargetClick = event => {
		if (this.currentGuide.onClick) {
			this.currentGuide.onClick(event.target === this.target);
		}

		if (this.resolve) {
			this.resolve(event.target === this.target);
		}
	};

	public async showGuide(guide: IGuideDetail) {
		this.currentGuide = guide;

		let docStyle = document.documentElement.style;
		docStyle.setProperty('--targetX', guide.targetX + 'px');
		docStyle.setProperty('--targetY', guide.targetY + 'px');
		docStyle.setProperty('--quadrantX', window.innerWidth / 2 > guide.targetX - window.pageXOffset ? '1' : '-1');
		docStyle.setProperty('--quadrantY', window.innerHeight / 2 > guide.targetY - window.pageYOffset ? '1' : '-1');
		docStyle.setProperty(
			'--xFactor',
			Math.log2(1 + 4 * Math.abs(window.innerWidth / 2 - guide.targetX) / window.innerWidth) + ''
		);
		if (guide.targetWidth) {
			docStyle.setProperty('--targetWidth', guide.targetWidth + 'px');
		}
		if (guide.targetHeight) {
			docStyle.setProperty('--targetHeight', guide.targetHeight + 'px');
		}
		if (guide.borderRadius) {
			docStyle.setProperty('--borderRadius', guide.borderRadius);
		}
		if (guide.contentTopDisplacement) {
			docStyle.setProperty('--titleTopDisplacement', guide.contentTopDisplacement + 'px');
		}

		this.title.innerHTML = guide.title;
		this.desc.innerHTML = guide.description ? guide.description : '';

		if (guide.btnText) {
			this.okayBtn.innerHTML = guide.btnText;
			this.okayBtn.className = TapTarget.okayBtnClassName;
			this.okayBtn.addEventListener('click', this.onTargetClick);
		}

		this.target.addEventListener('click', this.onTargetClick);

		setTimeout(
			function() {
				this.taptarget.className = TapTarget.ttClassName;
			}.bind(this),
			2000 * (this.config && this.config.duration ? this.config.duration : 0.5)
		);

		return new Promise(resolve => {
			this.resolve = resolve;
		});
	}

	public hideGuide() {
		this.taptarget.className = TapTarget.ttClassName + ' ' + TapTarget.hiddenClassName;
		this.target.removeEventListener('click', this.onTargetClick);
		if (this.currentGuide.btnText) {
			this.okayBtn.className = TapTarget.okayBtnClassName + ' ' + TapTarget.hiddenClassName;
			this.okayBtn.removeEventListener('click', this.onTargetClick);
		}

		return this;
	}

	public async showPlainMessage(title: string, description: string, btnText?: string) {
		this.title.innerHTML = title;
		this.desc.innerHTML = description;

		btnText = btnText ? btnText : 'Okay';

		this.okayBtn.innerHTML = btnText;
		this.okayBtn.className = TapTarget.okayBtnClassName;

		this.okayBtn.addEventListener('click', this.onTargetClick);

		this.content.className = TapTarget.contentClassName + ' ' + TapTarget.plainMsgClassName;

		return new Promise(resolve => {
			this.resolve = resolve;
		});
	}

	public hidePlainMessage() {
		this.content.className = TapTarget.contentClassName;
		this.okayBtn.className = TapTarget.okayBtnClassName + ' ' + TapTarget.hiddenClassName;
		this.okayBtn.removeEventListener('click', this.onTargetClick);
	}

	public dispose() {
		document.body.removeChild(this.taptarget);

		this.body.className = this.body.className.replace(' ' + TapTarget.activeClassName, '');
	}
}

/**
 * 1. waitForJS? then wait
 * 2. delay.before? then delay
 * 3. evalJS.before? then eval
 * 4. !selector? then showMessage 6.
 * 5. !skipFocus? then focus
 * 6. click? then click and hide
 * 7. evalJS.after? then eval
 * 8. delay.after? then delay
 * 9. Go to next
 */
export class TapTargetTour {
	private tapTarget: TapTarget;

	constructor(private tourGuides: ITourGuide[], guideSettings?: IGuideSettings) {
		this.tapTarget = new TapTarget(guideSettings);
	}

	private async timeout(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	private waitForJS(js: string) {
		return new Promise(resolve => {
			if (eval(js)) {
				resolve();
			}

			let timer = setInterval(() => {
				if (eval(js)) {
					clearInterval(timer);
					resolve();
				}
			}, 1000);
		});
	}

	private clickElement(selector?: string) {
		let element: HTMLElement;

		if (selector) {
			element = document.querySelector(selector) as HTMLElement;
			if (element) {
				element.click();
			}
		}
	}

	private async showMessage(title: string, description: string, btnClickAction?: string) {
		await this.tapTarget.showPlainMessage(title, description);
		this.tapTarget.hidePlainMessage();
		this.clickElement(btnClickAction);
	}

	private async showTapTarget(guide: ITourGuide) {
		let {
			selector,
			content,
			contentTopDisplacement,
			isFlat,
			focusFactor = { width: 1, height: 1 },
			focusDisplacement = { left: 0, top: 0 },
			btnText,
			onTargetClick,
			onBtnClick
		} = guide;

		let element = document.querySelector(selector) as HTMLElement;
		if (!element) {
			return Promise.resolve();
		}

		element.scrollIntoView();
		await this.timeout(100);

		let boundingRect = element.getBoundingClientRect();

		let targetX = window.pageXOffset + boundingRect.left + element.offsetWidth / 2 + focusDisplacement.left;

		let guideDetail: IGuideDetail = {
			targetX: window.pageXOffset + boundingRect.left + element.offsetWidth / 2 + focusDisplacement.left,
			targetY: window.pageYOffset + boundingRect.top + element.offsetHeight / 2 + focusDisplacement.top,
			title: content.title,
			description: content.description,
			btnText: btnText,
			contentTopDisplacement: contentTopDisplacement
		};

		if (isFlat) {
			guideDetail.targetWidth = element.offsetWidth * focusFactor.width;
			guideDetail.targetHeight = element.offsetHeight * focusFactor.height;
			guideDetail.borderRadius = '5px';
		}

		let targetClicked = await this.tapTarget.showGuide(guideDetail);
		if (targetClicked === true) {
			this.clickElement(onTargetClick);
		} else {
			this.clickElement(onBtnClick);
		}
		this.tapTarget.hideGuide();
	}

	private async preProcess(guide: ITourGuide) {
		let { waitForJS, delayMS, evalJS } = guide;

		if (waitForJS) {
			await this.waitForJS(waitForJS);
		}

		if (delayMS && delayMS.before) {
			await this.timeout(delayMS.before);
		}

		if (evalJS && evalJS.before) {
			eval(evalJS.before);
		}
	}

	private async postProcess(guide: ITourGuide) {
		let { delayMS, evalJS } = guide;

		if (evalJS && evalJS.after) {
			eval(evalJS.after);
		}

		if (delayMS && delayMS.after) {
			await this.timeout(delayMS.after);
		} else {
			await this.timeout(500);
		}
	}

	private async showGuide(index: number) {
		if (index >= this.tourGuides.length) {
			return;
		}

		let guide = this.tourGuides[index];

		await this.preProcess(guide);

		let {
			selector,
			onTargetClick,
			content,
			skipFocus,
			isFlat,
			focusFactor,
			focusDisplacement,
			btnText,
			onBtnClick
		} = guide;

		if (!selector) {
			await this.showMessage(content.title, content.description, onBtnClick);
		} else if (!skipFocus) {
			await this.showTapTarget(guide);
		} else {
			this.clickElement(onTargetClick);
		}

		await this.postProcess(guide);

		await this.showGuide(index + 1);
	}

	public async takeTour() {
		let index = 0;

		await this.showGuide(index);
	}

	public dispose() {
		this.tapTarget.dispose();
	}
}

export class TapTargetAppTour {
	private static readonly StorageKeyPrefix: string = 'TapTargetAppTourForPage_';

	private timer: NodeJS.Timer;
	private tourInProgress: boolean;

	constructor(
		private appTourGuide: IAppTourGuide,
		private guideSettings?: IGuideSettings,
		private intervalMS: number = 1000
	) {}

	private checkCurrentPage = async () => {
		if (this.tourInProgress === true) {
			return;
		}

		let path = window.location.pathname;
		let pageTour = this.appTourGuide[path];
		if (pageTour) {
			if (localStorage.getItem(TapTargetAppTour.StorageKeyPrefix + path) === pageTour.version) {
				return;
			}

			this.tourInProgress = true;

			let tour = new TapTargetTour(pageTour.tourGuides, this.guideSettings);
			await tour.takeTour();
			tour.dispose();

			if (!pageTour.showAlways) {
				localStorage.setItem(TapTargetAppTour.StorageKeyPrefix + path, pageTour.version);
			}

			this.tourInProgress = false;
		}
	};

	public takeTour() {
		this.timer = setInterval(this.checkCurrentPage, this.intervalMS);
	}

	public dispose() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}
}

export type ITourGuide = ITourGuide;
export type IAppTourGuide = IAppTourGuide;
export type IPageTourGuide = IPageTourGuide;
export type IGuideSettings = IGuideSettings;

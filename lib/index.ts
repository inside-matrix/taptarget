class TapTarget {
	private static readonly ttClassName: string = 'taptarget';
	private static readonly spaceClassName: string = 'taptarget-space';
	private static readonly titleClassName: string = 'taptarget-title';
	private static readonly descriptionClassName: string = 'taptarget-description';
	private static readonly targetClassName: string = 'taptarget-target';
	private static readonly targetOuterClassName: string = 'taptarget-target-outer';
	private static readonly hiddenClassName: string = 'taptarget-hidden';

	constructor(private config?: IConfig) {
		this.configure();
		this.prepare();
	}

	private configure() {
		if (this.config) {
			let docStyle = document.documentElement.style;
			if (this.config.targetWidth) {
				docStyle.setProperty('--targetWidth', this.config.targetWidth + 'px');
			}
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
	}

	private prepare() {
		let ttElements = document.getElementsByClassName(TapTarget.ttClassName);
		if (!ttElements || ttElements.length <= 0) {
			let taptarget = document.createElement('div');
			taptarget.className = TapTarget.ttClassName + ' ' + TapTarget.hiddenClassName;
			document.body.appendChild(taptarget);

			let space = document.createElement('div');
			space.className = TapTarget.spaceClassName;
			taptarget.appendChild(space);

			let title = document.createElement('div');
			title.className = TapTarget.titleClassName;
			space.appendChild(title);

			let desc = document.createElement('div');
			desc.className = TapTarget.descriptionClassName;
			space.appendChild(desc);

			let target = document.createElement('div');
			target.className = TapTarget.targetClassName;
			taptarget.appendChild(target);

			let targetOuter = document.createElement('div');
			targetOuter.className = TapTarget.targetOuterClassName;
			taptarget.appendChild(targetOuter);
		}
	}

	public show(guide: IGuide) {
		let docStyle = document.documentElement.style;
		docStyle.setProperty('--targetX', guide.targetX + 'px');
		docStyle.setProperty('--targetY', guide.targetY + 'px');

		let taptarget = document.getElementsByClassName(TapTarget.ttClassName).item(0);
		let space = taptarget.getElementsByClassName(TapTarget.spaceClassName).item(0);
		let title = space.getElementsByClassName(TapTarget.titleClassName).item(0);
		title.innerHTML = guide.title;
		let desc = space.getElementsByClassName(TapTarget.descriptionClassName).item(0);
		desc.innerHTML = guide.description ? guide.description : '';

		taptarget.className = TapTarget.ttClassName;

		return this;
	}

	public hide() {
		let taptarget = document.getElementsByClassName(TapTarget.ttClassName).item(0);
		taptarget.className = TapTarget.ttClassName + ' ' + TapTarget.hiddenClassName;

		return this;
	}

	public dispose() {
		let taptarget = document.getElementsByClassName(TapTarget.ttClassName).item(0);
		document.removeChild(taptarget);
	}
}

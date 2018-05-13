"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
class TapTarget {
    constructor(config) {
        this.config = config;
        this.onTargetClick = event => {
            if (this.currentGuide.onClick) {
                this.currentGuide.onClick(event.target === this.target);
            }
            if (this.resolve) {
                this.resolve(event.target === this.target);
            }
        };
        this.configure();
        this.prepare();
    }
    configure() {
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
    prepare() {
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
    showGuide(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentGuide = guide;
            let docStyle = document.documentElement.style;
            docStyle.setProperty('--targetX', guide.targetX + 'px');
            docStyle.setProperty('--targetY', guide.targetY + 'px');
            docStyle.setProperty('--quadrantX', window.innerWidth / 2 > guide.targetX - window.pageXOffset ? '1' : '-1');
            docStyle.setProperty('--quadrantY', window.innerHeight / 2 > guide.targetY - window.pageYOffset ? '1' : '-1');
            docStyle.setProperty('--xFactor', Math.log2(1 + 4 * Math.abs(window.innerWidth / 2 - guide.targetX) / window.innerWidth) + '');
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
            setTimeout(function () {
                this.taptarget.className = TapTarget.ttClassName;
            }.bind(this), 2000 * (this.config && this.config.duration ? this.config.duration : 0.5));
            return new Promise(resolve => {
                this.resolve = resolve;
            });
        });
    }
    hideGuide() {
        this.taptarget.className = TapTarget.ttClassName + ' ' + TapTarget.hiddenClassName;
        this.target.removeEventListener('click', this.onTargetClick);
        if (this.currentGuide.btnText) {
            this.okayBtn.className = TapTarget.okayBtnClassName + ' ' + TapTarget.hiddenClassName;
            this.okayBtn.removeEventListener('click', this.onTargetClick);
        }
        return this;
    }
    showPlainMessage(title, description, btnText) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    hidePlainMessage() {
        this.content.className = TapTarget.contentClassName;
        this.okayBtn.className = TapTarget.okayBtnClassName + ' ' + TapTarget.hiddenClassName;
        this.okayBtn.removeEventListener('click', this.onTargetClick);
    }
    dispose() {
        document.body.removeChild(this.taptarget);
        this.body.className = this.body.className.replace(' ' + TapTarget.activeClassName, '');
    }
}
TapTarget.ttClassName = 'taptarget';
TapTarget.spaceClassName = 'taptarget-space';
TapTarget.titleClassName = 'taptarget-title';
TapTarget.descriptionClassName = 'taptarget-description';
TapTarget.okayBtnClassName = 'taptarget-okay-btn';
TapTarget.contentClassName = 'taptarget-content';
TapTarget.plainMsgClassName = 'taptarget-plain-message';
TapTarget.targetClassName = 'taptarget-target';
TapTarget.targetOuterClassName = 'taptarget-target-outer';
TapTarget.hiddenClassName = 'taptarget-hidden';
TapTarget.activeClassName = 'taptarget-active';
exports.TapTarget = TapTarget;
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
class TapTargetTour {
    constructor(tourGuides, guideSettings) {
        this.tourGuides = tourGuides;
        this.tapTarget = new TapTarget(guideSettings);
    }
    timeout(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    waitForJS(js) {
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
    clickElement(selector) {
        let element;
        if (selector) {
            element = document.querySelector(selector);
            if (element) {
                element.click();
            }
        }
    }
    showMessage(title, description, btnClickAction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tapTarget.showPlainMessage(title, description);
            this.tapTarget.hidePlainMessage();
            this.clickElement(btnClickAction);
        });
    }
    showTapTarget(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            let { selector, content, contentTopDisplacement, isFlat, focusFactor = { width: 1, height: 1 }, focusDisplacement = { left: 0, top: 0 }, btnText, onTargetClick, onBtnClick } = guide;
            let element = document.querySelector(selector);
            if (!element) {
                return Promise.resolve();
            }
            element.scrollIntoView();
            yield this.timeout(100);
            let boundingRect = element.getBoundingClientRect();
            let targetX = window.pageXOffset + boundingRect.left + element.offsetWidth / 2 + focusDisplacement.left;
            let guideDetail = {
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
            let targetClicked = yield this.tapTarget.showGuide(guideDetail);
            if (targetClicked === true) {
                this.clickElement(onTargetClick);
            }
            else {
                this.clickElement(onBtnClick);
            }
            this.tapTarget.hideGuide();
        });
    }
    preProcess(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            let { waitForJS, delayMS, evalJS } = guide;
            if (waitForJS) {
                yield this.waitForJS(waitForJS);
            }
            if (delayMS && delayMS.before) {
                yield this.timeout(delayMS.before);
            }
            if (evalJS && evalJS.before) {
                eval(evalJS.before);
            }
        });
    }
    postProcess(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            let { delayMS, evalJS } = guide;
            if (evalJS && evalJS.after) {
                eval(evalJS.after);
            }
            if (delayMS && delayMS.after) {
                yield this.timeout(delayMS.after);
            }
            else {
                yield this.timeout(500);
            }
        });
    }
    showGuide(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (index >= this.tourGuides.length) {
                return;
            }
            let guide = this.tourGuides[index];
            yield this.preProcess(guide);
            let { selector, onTargetClick, content, skipFocus, isFlat, focusFactor, focusDisplacement, btnText, onBtnClick } = guide;
            if (!selector) {
                yield this.showMessage(content.title, content.description, onBtnClick);
            }
            else if (!skipFocus) {
                yield this.showTapTarget(guide);
            }
            else {
                this.clickElement(onTargetClick);
            }
            yield this.postProcess(guide);
            yield this.showGuide(index + 1);
        });
    }
    takeTour() {
        return __awaiter(this, void 0, void 0, function* () {
            let index = 0;
            yield this.showGuide(index);
        });
    }
    dispose() {
        this.tapTarget.dispose();
    }
}
exports.TapTargetTour = TapTargetTour;
class TapTargetAppTour {
    constructor(appTourGuide, guideSettings, intervalMS = 1000) {
        this.appTourGuide = appTourGuide;
        this.guideSettings = guideSettings;
        this.intervalMS = intervalMS;
        this.checkCurrentPage = () => __awaiter(this, void 0, void 0, function* () {
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
                yield tour.takeTour();
                tour.dispose();
                if (!pageTour.showAlways) {
                    localStorage.setItem(TapTargetAppTour.StorageKeyPrefix + path, pageTour.version);
                }
                this.tourInProgress = false;
            }
        });
    }
    takeTour() {
        this.timer = setInterval(this.checkCurrentPage, this.intervalMS);
    }
    dispose() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
TapTargetAppTour.StorageKeyPrefix = 'TapTargetAppTourForPage_';
exports.TapTargetAppTour = TapTargetAppTour;

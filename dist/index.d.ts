import { IGuideSettings } from './IGuideSettings';
import { IGuideDetail } from './IGuideDetail';
import { ITourGuide, IAppTourGuide, IPageTourGuide } from './ITourGuide';
import './index.css';
export declare class TapTarget {
    private config;
    private static readonly ttClassName;
    private static readonly spaceClassName;
    private static readonly titleClassName;
    private static readonly descriptionClassName;
    private static readonly okayBtnClassName;
    private static readonly contentClassName;
    private static readonly plainMsgClassName;
    private static readonly targetClassName;
    private static readonly targetOuterClassName;
    private static readonly hiddenClassName;
    private static readonly activeClassName;
    private currentGuide;
    private body;
    private taptarget;
    private space;
    private content;
    private title;
    private desc;
    private okayBtn;
    private target;
    private targetOuter;
    private resolve;
    constructor(config?: IGuideSettings);
    private configure();
    private prepare();
    onTargetClick: (event: any) => void;
    showGuide(guide: IGuideDetail): Promise<{}>;
    hideGuide(): this;
    showPlainMessage(title: string, description: string, btnText?: string): Promise<{}>;
    hidePlainMessage(): void;
    dispose(): void;
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
export declare class TapTargetTour {
    private tourGuides;
    private tapTarget;
    constructor(tourGuides: ITourGuide[], guideSettings?: IGuideSettings);
    private timeout(ms);
    private waitForJS(js);
    private clickElement(selector?);
    private showMessage(title, description, btnClickAction?);
    private showTapTarget(guide);
    private preProcess(guide);
    private postProcess(guide);
    private showGuide(index);
    takeTour(): Promise<void>;
    dispose(): void;
}
export declare class TapTargetAppTour {
    private appTourGuide;
    private guideSettings;
    private intervalMS;
    private static readonly StorageKeyPrefix;
    private timer;
    private tourInProgress;
    constructor(appTourGuide: IAppTourGuide, guideSettings?: IGuideSettings, intervalMS?: number);
    private checkCurrentPage;
    takeTour(): void;
    dispose(): void;
}
export declare type ITourGuide = ITourGuide;
export declare type IAppTourGuide = IAppTourGuide;
export declare type IPageTourGuide = IPageTourGuide;
export declare type IGuideSettings = IGuideSettings;

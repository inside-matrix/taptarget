export interface IGuideContent {
	title: string;
	description: string;
}

export interface IFocusFactor {
	width: number;
	height: number;
}

export interface IFocusDisplacement {
	left: number;
	top: number;
}

export interface ITourGuide {
	content: IGuideContent;
	selector?: string;
	onTargetClick?: string;
	btnText?: string;
	onBtnClick?: string;
	focusFactor?: IFocusFactor;
	focusDisplacement?: IFocusDisplacement;
	contentTopDisplacement?: number;
	skipFocus?: boolean;
	isFlat?: boolean;
	delayMS?: {
		before?: number;
		after?: number;
	};
	evalJS?: {
		before?: string;
		after?: string;
	};
	waitForJS?: string;
}

export interface IPageTourGuide {
	tourGuides: ITourGuide[];
	version: string;
	showAlways?: boolean;
}

export type IAppTourGuide = { [path: string]: IPageTourGuide };

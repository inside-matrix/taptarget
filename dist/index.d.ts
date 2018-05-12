import { IConfig } from './IConfig';
import { IGuide } from './IGuide';
export declare class TapTarget {
	private config;
	private static readonly ttClassName;
	private static readonly spaceClassName;
	private static readonly titleClassName;
	private static readonly descriptionClassName;
	private static readonly targetClassName;
	private static readonly targetOuterClassName;
	private static readonly hiddenClassName;
	constructor(config?: IConfig);
	private configure();
	private prepare();
	show(guide: IGuide): this;
	hide(): this;
	dispose(): void;
}

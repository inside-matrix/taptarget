export interface IGuide {
    targetX: number;
    targetY: number;
    title: string;
    description?: string;
    onClick?: Function;
    targetWidth?: number;
    targetHeight?: number;
    borderRadius?: number;
}

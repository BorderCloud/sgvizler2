import { Container } from '../sgvizler';
/**
 * @class sgvizler.LoadingIcon
 * @memberof sgvizler
 */
export declare class LoadingIcon {
    private static readonly _imgWait;
    private _processusWaiting;
    private _rotation;
    private _container;
    constructor(container: Container);
    show(): void;
    hide(): void;
}

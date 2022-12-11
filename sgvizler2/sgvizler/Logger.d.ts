import * as S from '../sgvizler';
/**
 * Handles all logging, either to console or designated HTML
 * container.
 *
 * @class sgvizler.Logger
 * @memberof sgvizler
 */
export declare class Logger {
    private static _doneCallEvent;
    private static _failCallEvent;
    static done(callback: any): Logger;
    static fireDoneEvent(container: S.Container): void;
    static fail(callback: any): Logger;
    static fireFailEvent(container: S.Container): void;
    /**
     * The timestamp for the load start of the current running
     * version of sgvizler. Used to calculate time elapse of
     * future events.
     */
    private static _startTime;
    /**
     * Logs a message.
     * @method log
     * @protected
     * @param {string} message The message to log.
     */
    static log(container: S.Container, message: string): void;
    static logSimple(message: string): void;
    /**
     * Todo
     * @param {Container} container
     * @param {MESSAGES} messageName
     * @param {Array<string>} args
     */
    static displayFeedback(container: S.Container, messageName: S.MESSAGES, args?: Array<string>): void;
    /**
     * @method timeElapsed
     * @private
     * @return {number} The number of seconds elapsed since
     * this sgvizler got loaded.
     */
    private static elapsedTime;
}

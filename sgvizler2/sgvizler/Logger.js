import * as S from '../sgvizler';
/**
 * Handles all logging, either to console or designated HTML
 * container.
 *
 * @class sgvizler.Logger
 * @memberof sgvizler
 */
export class Logger {
    static done(callback) {
        this._doneCallEvent = callback;
        return this;
    }
    static fireDoneEvent(container) {
        container.loadingIcon.hide();
        if (this._doneCallEvent) {
            this._doneCallEvent(container.id);
        }
    }
    static fail(callback) {
        this._failCallEvent = callback;
        return this;
    }
    static fireFailEvent(container) {
        container.loadingIcon.hide();
        if (this._failCallEvent) {
            this._failCallEvent(container.id);
        }
    }
    /**
     * Logs a message.
     * @method log
     * @protected
     * @param {string} message The message to log.
     */
    static log(container, message) {
        if (container.loglevel === 2) {
            console.log(this.elapsedTime() + 's: ' + message);
        }
    }
    static logSimple(message) {
        console.log(this.elapsedTime() + 's: ' + message);
    }
    /**
     * Todo
     * @param {Container} container
     * @param {MESSAGES} messageName
     * @param {Array<string>} args
     */
    static displayFeedback(container, messageName, args) {
        let message = S.Messages.get(messageName, args);
        if (container.loglevel === 2) {
            if (message) {
                let obj = document.getElementById(container.id);
                if (obj) {
                    obj.innerHTML = "<p style='color:red'>" + message + '</p>';
                }
            }
        }
        Logger.fireFailEvent(container);
    }
    /**
     * @method timeElapsed
     * @private
     * @return {number} The number of seconds elapsed since
     * this sgvizler got loaded.
     */
    static elapsedTime() {
        return (Date.now() - this._startTime) / 1000;
    }
}
/**
 * The timestamp for the load start of the current running
 * version of sgvizler. Used to calculate time elapse of
 * future events.
 */
Logger._startTime = Date.now();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Nndml6bGVyL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLGFBQWEsQ0FBQTtBQUdoQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQUlSLE1BQU0sQ0FBQyxJQUFJLENBQUUsUUFBYTtRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQTtRQUM5QixPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFDTSxNQUFNLENBQUMsYUFBYSxDQUFFLFNBQXNCO1FBQy9DLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBSSxDQUFFLFFBQWE7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7UUFDOUIsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBQ00sTUFBTSxDQUFDLGFBQWEsQ0FBRSxTQUFzQjtRQUMvQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7SUFDTCxDQUFDO0lBU0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUFFLFNBQXNCLEVBQUUsT0FBZTtRQUN0RCxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFBO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBRSxPQUFlO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUFFLFNBQXNCLEVBQUUsV0FBdUIsRUFBRSxJQUFvQjtRQUNoRyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFFOUMsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzNCLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQy9DLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ04sR0FBRyxDQUFDLFNBQVMsR0FBRyx1QkFBdUIsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFBO2dCQUM5RCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLE1BQU0sQ0FBQyxXQUFXO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUNoRCxDQUFDOztBQXBERDs7OztHQUlHO0FBQ1ksaUJBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUEifQ==
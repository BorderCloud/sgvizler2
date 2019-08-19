import * as S from '../sgvizler'
import {Dependency} from "../sgvizler";
import Timeout = NodeJS.Timeout;

/**
 * @class sgvizler.LoadingIcon
 * @memberof sgvizler
 */
export class LoadingIcon {
    private static _processusWaiting:Timeout
    private static _rotation:number = 0
    private static _imgWait = "data:image/png;base64,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";

    public static displayLoadingIcon(container: S.Container) {
        let obj = document.getElementById(container.id)
        if (obj) {
            obj.innerHTML = "<canvas class='imageWait' " +
                "style='position: relative;top: 50%;left: 50%;transform: translate(-50%, -50%);margin:100px auto;'></canvas>";

            let canvas = obj.getElementsByTagName( 'canvas' )[0];
            canvas.setAttribute('width', "100");
            canvas.setAttribute('height', "100");
            var image = new Image();
            image.onload = function() {
                LoadingIcon._processusWaiting = setInterval(function() {
                    let  ctx = canvas.getContext('2d')
                    if (ctx) {
                        let xcenter = ctx.canvas.width / 2,
                            ycenter = ctx.canvas.height / 2,
                            sourceWidth = 65,
                            sourceHeight = 65;
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        ctx.save();
                        ctx.translate(xcenter, ycenter);// to get it in the origin
                        LoadingIcon._rotation += 2;
                        ctx.rotate(LoadingIcon._rotation * Math.PI / 64);//rotate in origin
                        ctx.drawImage(image, -sourceWidth / 2, -sourceHeight / 2);
                        ctx.restore();
                    }
                }, 20)
            };
            image.src = this._imgWait;
        }
    }
    public static hideLoadingIcon(container: S.Container) {
        let obj = document.getElementById(container.id)
        if (obj) {
            let canvas = obj.getElementsByTagName( 'canvas' )[0];
            if(canvas) {
                canvas.style.display = 'none';
            }
        }
        clearInterval(this._processusWaiting);
    }
}

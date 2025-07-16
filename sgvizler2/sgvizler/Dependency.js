import { Loader, Logger } from '../sgvizler';
export class Dependency {
    constructor(url, loadBefore) {
        this.url = url;
        this.loadBefore = loadBefore ? loadBefore : null;
        this.endDownload = false;
        this.startDownload = false;
    }
    load() {
        if (!this.isLoaded()) {
            this.startDownload = true;
            Logger.logSimple('Load started :' + this.url);
            Loader.load(this);
        }
    }
    isLoaded() {
        if (Loader.isLoaded(this)) {
            this.startDownload = true;
            this.endDownload = true;
        }
        return this.endDownload;
    }
    callBack() {
        this.endDownload = true;
        Logger.logSimple('Load ended :' + this.url);
    }
}
export class ScriptDependency extends Dependency {
}
export class CssDependency extends Dependency {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwZW5kZW5jeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZ3Zpemxlci9EZXBlbmRlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxNQUFNLEVBQ04sTUFBTSxFQUNULE1BQU0sYUFBYSxDQUFBO0FBRXBCLE1BQU0sT0FBZ0IsVUFBVTtJQU01QixZQUFhLEdBQVcsRUFBQyxVQUF1QjtRQUM1QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQTtJQUM5QixDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtZQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQzNCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDM0IsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDL0MsQ0FBQztDQUNKO0FBRUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFVBQVU7Q0FBRztBQUVuRCxNQUFNLE9BQU8sYUFBYyxTQUFRLFVBQVU7Q0FBRyJ9
export declare abstract class Dependency {
    url: string;
    loadBefore: Dependency | null;
    endDownload: boolean;
    startDownload: boolean;
    constructor(url: string, loadBefore?: Dependency);
    load(): void;
    isLoaded(): boolean;
    callBack(): void;
}
export declare class ScriptDependency extends Dependency {
}
export declare class CssDependency extends Dependency {
}

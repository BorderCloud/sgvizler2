export declare abstract class WktLiteral {
    spatialReferenceSystem: string;
    constructor(spatialReferenceSystem?: string);
    static create(raw: string): any;
    static getNumber(value: any, parameterName: string): any;
}
export declare class PointWktLiteral extends WktLiteral {
    lat: number;
    long: number;
    constructor(long: any, lat: any, spatialReferenceSystem?: string);
    equals(obj: any): boolean;
}
export declare class LinestringWktLiteral extends WktLiteral {
    points: Array<PointWktLiteral>;
    push(pointWktLiteral: PointWktLiteral): void;
}
export declare class EnvelopeWktLiteral extends WktLiteral {
    minLong: number;
    maxLong: number;
    maxLat: number;
    minLat: number;
    constructor(minLong: any, maxLong: any, maxLat: any, minLat: any, spatialReferenceSystem?: string);
}
export declare class PolygonWktLiteral extends WktLiteral {
    points: Array<PointWktLiteral>;
    push(pointWktLiteral: PointWktLiteral): void;
}
export declare class MultiPolygonWktLiteral extends WktLiteral {
    polygons: Array<PolygonWktLiteral>;
    push(polygonWktLiteral: PolygonWktLiteral): void;
}
export declare class ErrorWktLiteral extends Error {
}

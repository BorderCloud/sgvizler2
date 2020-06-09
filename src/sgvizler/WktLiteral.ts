
// Doc: 11-052r4_OGC_GeoSPARQL_-_A_Geographic_Query_Language_for_RDF_Data.pdf
export abstract class WktLiteral {
// Doc: 11-052r4_OGC_GeoSPARQL_-_A_Geographic_Query_Language_for_RDF_Data.pdf

    spatialReferenceSystem:string;

    constructor(spatialReferenceSystem?:string) {
        this.spatialReferenceSystem = spatialReferenceSystem ?? 'http://www.wikidata.org/entity/Q42274'; //by default : Earth
    }

    static create(raw: string): any {
        // Point(LONG LAT): A single point as described above (Note the lack of a comma)
        const regexPoint = /^(?:\s*<([^>]+)>\s+)?Point\(([^\s]+) +([^\s]+)\)$/i;
        const resultPoint = raw.match(regexPoint);
        if(resultPoint != null){
            return new PointWktLiteral(parseFloat(resultPoint[2]),parseFloat(resultPoint[3]),resultPoint[1]);
        }

        // Linestring(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN): A line connecting the specified points (Commas between each point)
        const regexLinestring = /^(?:\s*<([^>]+)>\s+)?Linestring\((.+)\)$/i;
        const regexLonLatList = /([^\s,]+?)\s+([^\s,]+)/g;
        const resultLinestring = raw.match(regexLinestring);
        if(resultLinestring != null){
            let resultLinestringList = resultLinestring[2].matchAll(regexLonLatList);
            const line = new LinestringWktLiteral(resultLinestring[1]);
            for (const match of resultLinestringList) {
                line.push(new PointWktLiteral(parseFloat(match[1]),parseFloat(match[2]),resultLinestring[1]))
            }
            return line;
        }

        // Envelope(minLong, maxLong, maxLat, minLat): A rectangle with the specified corners (Note the commas between each and especially note the somewhat odd ordering of (min, max, max, min)).
        const regexEnvelope = /^(?:\s*<([^>]+)>\s+)?Envelope\(\s*([^\s,]+)\s*,\s*([^\s]+)\s*,\s*([^\s]+)\s*,\s*([^\s]+)\s*\)$/i;
        const resultEnvelope = raw.match(regexEnvelope);
        if(resultEnvelope != null){
            return new EnvelopeWktLiteral(parseFloat(resultEnvelope[2]),parseFloat(resultEnvelope[3]),parseFloat(resultEnvelope[4]),parseFloat(resultEnvelope[5]),resultEnvelope[1]);
        }

        // Polygon(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN, LONG1 LAT1): A filled-in shape with the specified points (Note that a polygon must start and end with the same point, i.e., be closed)
        const regexPolygon = /^(?:\s*<([^>]+)>\s+)?Polygon\((.+)\)$/i;
        const resultPolygon = raw.match(regexPolygon);
        if(resultPolygon != null){
            let resultPolygonList = resultPolygon[2].matchAll(regexLonLatList);
            const polygon = new PolygonWktLiteral(resultPolygon[1]);
            for (const match of resultPolygonList) {
                polygon.push(new PointWktLiteral(parseFloat(match[1]),parseFloat(match[2]),resultPolygon[1]))
            }
            return polygon;
        }
        return null;
    }
}

export class PointWktLiteral extends WktLiteral {
    lat:number;
    long:number;

    constructor(long:number, lat:number,spatialReferenceSystem?:string) {
        super(spatialReferenceSystem);
        this.lat = lat;
        this.long = long;
    }

    public equals(obj: any) : boolean {
        if(obj instanceof PointWktLiteral){
            const p = <PointWktLiteral> obj;
            if(p.long === this.long && p.lat === this.lat) {
                return true;
            }
        }
        return false;
    }
}
export class LinestringWktLiteral extends WktLiteral {
    points: Array<PointWktLiteral> = [];
    push(pointWktLiteral: PointWktLiteral) {
        this.points.push(pointWktLiteral);
    }
}

export class EnvelopeWktLiteral extends WktLiteral {
    minLong:number;
    maxLong:number;
    maxLat:number;
    minLat:number;

    constructor(minLong:number, maxLong:number, maxLat:number, minLat:number, spatialReferenceSystem?:string) {
        super(spatialReferenceSystem);
        this.minLong = minLong;
        this.maxLong = maxLong;
        this.maxLat = maxLat;
        this.minLat = minLat;
    }
}

export class PolygonWktLiteral extends WktLiteral {
    points: Array<PointWktLiteral> = [];
    push(pointWktLiteral: PointWktLiteral) {
        this.points.push(pointWktLiteral);
    }
}
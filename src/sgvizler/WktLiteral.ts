// Doc: 11-052r4_OGC_GeoSPARQL_-_A_Geographic_Query_Language_for_RDF_Data.pdf

export abstract class WktLiteral {
// Doc: 11-052r4_OGC_GeoSPARQL_-_A_Geographic_Query_Language_for_RDF_Data.pdf

    spatialReferenceSystem:string;

    constructor(spatialReferenceSystem?:string) {
        this.spatialReferenceSystem = spatialReferenceSystem ?? 'http://www.wikidata.org/entity/Q42274'; //by default : Earth
    }

    static create(raw: string): any {
        try{
            // Point(LONG LAT): A single point as described above (Note the lack of a comma)
            const regexPoint = /^(?:\s*<([^>]+)>\s+)?Point\s*\(([^\s]+) +([^\s]+)\)$/i;
            const resultPoint = raw.match(regexPoint);
            if(resultPoint != null){
                    return new PointWktLiteral(resultPoint[2],resultPoint[3],resultPoint[1]);
            }

            // Linestring(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN): A line connecting the specified points (Commas between each point)
            const regexLinestring = /^(?:\s*<([^>]+)>\s+)?Linestring\s*\((.+)\)$/i;
            const regexLonLatList = /([^\s,]+?)\s+([^\s,]+)/g;
            const resultLinestring = raw.match(regexLinestring);
            if(resultLinestring != null){
                let resultLinestringList = resultLinestring[2].matchAll(regexLonLatList);
                const line = new LinestringWktLiteral(resultLinestring[1]);
                for (const match of resultLinestringList) {
                    line.push(new PointWktLiteral(match[1],match[2],resultLinestring[1]));
                }
                return line;
            }

            // Envelope(minLong, maxLong, maxLat, minLat): A rectangle with the specified corners (Note the commas between each and especially note the somewhat odd ordering of (min, max, max, min)).
            const regexEnvelope = /^(?:\s*<([^>]+)>\s+)?Envelope\s*\(\s*([^\s,]+)\s*,\s*([^\s]+)\s*,\s*([^\s]+)\s*,\s*([^\s]+)\s*\)$/i;
            const resultEnvelope = raw.match(regexEnvelope);
            if(resultEnvelope != null){
                return new EnvelopeWktLiteral(resultEnvelope[2],resultEnvelope[3],resultEnvelope[4],resultEnvelope[5],resultEnvelope[1]);
            }

            // Polygon(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN, LONG1 LAT1): A filled-in shape with the specified points (Note that a polygon must start and end with the same point, i.e., be closed)
            const regexPolygon = /^(?:\s*<([^>]+)>\s+)?Polygon\s*\(\(([^\(\)]+)\)\)$/i;
            const resultPolygon = raw.match(regexPolygon);
            if(resultPolygon != null){
                let resultPolygonList = resultPolygon[2].matchAll(regexLonLatList);
                const polygon = new PolygonWktLiteral(resultPolygon[1]);
                for (const match of resultPolygonList) {
                    polygon.push(new PointWktLiteral(match[1],match[2],resultPolygon[1]));
                }
                return polygon;
            }

            //https://docs.microsoft.com/fr-fr/sql/relational-databases/spatial/multipolygon?view=sql-server-ver15
            const regexMultiPolygon = /^(?:\s*<([^>]+)>\s+)?(?:MULTI)?POLYGON\s*\((.+)\)$/i;
            const regexPolygonList = /\(\(?(.+?)\)\)?/g;
            const resultMultiPolygon = raw.match(regexMultiPolygon);
            if(resultMultiPolygon != null){
                let resultPolygonList = resultMultiPolygon[2].matchAll(regexPolygonList);
                const multipolygon = new MultiPolygonWktLiteral(resultMultiPolygon[1]);

                for (const matchPolygon of resultPolygonList) {
                    let resultPointList = matchPolygon[1].matchAll(regexLonLatList);
                    let polygon = new PolygonWktLiteral(resultMultiPolygon[1]);
                    for (const match of resultPointList) {
                        polygon.push(new PointWktLiteral(match[1], match[2], resultMultiPolygon[1]));
                    }
                    multipolygon.push(polygon);
                }
                return multipolygon;
            }
        }catch (e) {
            if (e instanceof ErrorWktLiteral) {
                throw new ErrorWktLiteral("Parsing error. " + e.message + ": " + raw)
            } else {
                throw e
            }
        }
        throw new ErrorWktLiteral("Parsing error. Unknown syntax: " + raw)
    }

    static getNumber(value: any,parameterName:string): any {
        if (typeof value === 'number'){
            return value;
        }else{
            const valueNumber = parseFloat(value)
            if(! isNaN(valueNumber)){
                return valueNumber;
            } else {
                throw new ErrorWktLiteral("Value " + value + " of "+ parameterName + " is not a number");
            }
        }
    }
}

export class PointWktLiteral extends WktLiteral {
    lat:number;
    long:number;

    constructor(long:any, lat:any,spatialReferenceSystem?:string) {
        super(spatialReferenceSystem);
        this.long = WktLiteral.getNumber(long,"Point:longitude");
        this.lat = WktLiteral.getNumber(lat,"Point:latitude");
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

    constructor(minLong:any, maxLong:any, maxLat:any, minLat:any, spatialReferenceSystem?:string) {
        super(spatialReferenceSystem);

        this.minLong = WktLiteral.getNumber(minLong,"Envelope:minLong");
        this.maxLong = WktLiteral.getNumber(maxLong,"Envelope:maxLong");
        this.maxLat = WktLiteral.getNumber(maxLat,"Envelope:maxLat");
        this.minLat = WktLiteral.getNumber(minLat,"Envelope:minLat");
    }
}

export class PolygonWktLiteral extends WktLiteral {
    points: Array<PointWktLiteral> = [];
    push(pointWktLiteral: PointWktLiteral) {
        this.points.push(pointWktLiteral);
    }
}

export class MultiPolygonWktLiteral extends WktLiteral {
    polygons: Array<PolygonWktLiteral> = [];
    push(polygonWktLiteral: PolygonWktLiteral) {
        this.polygons.push(polygonWktLiteral);
    }
}

export class ErrorWktLiteral extends Error {}
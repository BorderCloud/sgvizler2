// Doc: 11-052r4_OGC_GeoSPARQL_-_A_Geographic_Query_Language_for_RDF_Data.pdf
export class WktLiteral {
    constructor(spatialReferenceSystem) {
        this.spatialReferenceSystem = spatialReferenceSystem !== null && spatialReferenceSystem !== void 0 ? spatialReferenceSystem : 'http://www.wikidata.org/entity/Q42274'; //by default : Earth
    }
    static create(raw) {
        try {
            // Point(LONG LAT): A single point as described above (Note the lack of a comma)
            const regexPoint = /^(?:\s*<([^>]+)>\s+)?Point\s*\(([^\s]+) +([^\s]+)\)$/i;
            const resultPoint = raw.match(regexPoint);
            if (resultPoint != null) {
                return new PointWktLiteral(resultPoint[2], resultPoint[3], resultPoint[1]);
            }
            // Linestring(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN): A line connecting the specified points (Commas between each point)
            const regexLinestring = /^(?:\s*<([^>]+)>\s+)?Linestring\s*\((.+)\)$/i;
            const regexLonLatList = /([^\s,]+?)\s+([^\s,]+)/g;
            const resultLinestring = raw.match(regexLinestring);
            if (resultLinestring != null) {
                let resultLinestringList = resultLinestring[2].matchAll(regexLonLatList);
                const line = new LinestringWktLiteral(resultLinestring[1]);
                for (const match of resultLinestringList) {
                    line.push(new PointWktLiteral(match[1], match[2], resultLinestring[1]));
                }
                return line;
            }
            // Envelope(minLong, maxLong, maxLat, minLat): A rectangle with the specified corners (Note the commas between each and especially note the somewhat odd ordering of (min, max, max, min)).
            const regexEnvelope = /^(?:\s*<([^>]+)>\s+)?Envelope\s*\(\s*([^\s,]+)\s*,\s*([^\s]+)\s*,\s*([^\s]+)\s*,\s*([^\s]+)\s*\)$/i;
            const resultEnvelope = raw.match(regexEnvelope);
            if (resultEnvelope != null) {
                return new EnvelopeWktLiteral(resultEnvelope[2], resultEnvelope[3], resultEnvelope[4], resultEnvelope[5], resultEnvelope[1]);
            }
            // Polygon(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN, LONG1 LAT1): A filled-in shape with the specified points (Note that a polygon must start and end with the same point, i.e., be closed)
            const regexPolygon = /^(?:\s*<([^>]+)>\s+)?Polygon\s*\(\(([^\(\)]+)\)\)$/i;
            const resultPolygon = raw.match(regexPolygon);
            if (resultPolygon != null) {
                let resultPolygonList = resultPolygon[2].matchAll(regexLonLatList);
                const polygon = new PolygonWktLiteral(resultPolygon[1]);
                for (const match of resultPolygonList) {
                    polygon.push(new PointWktLiteral(match[1], match[2], resultPolygon[1]));
                }
                return polygon;
            }
            //https://docs.microsoft.com/fr-fr/sql/relational-databases/spatial/multipolygon?view=sql-server-ver15
            const regexMultiPolygon = /^(?:\s*<([^>]+)>\s+)?(?:MULTI)?POLYGON\s*\((.+)\)$/i;
            const regexPolygonList = /\(\(?(.+?)\)\)?/g;
            const resultMultiPolygon = raw.match(regexMultiPolygon);
            if (resultMultiPolygon != null) {
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
        }
        catch (e) {
            if (e instanceof ErrorWktLiteral) {
                throw new ErrorWktLiteral("Parsing error. " + e.message + ": " + raw);
            }
            else {
                throw e;
            }
        }
        throw new ErrorWktLiteral("Parsing error. Unknown syntax: " + raw);
    }
    static getNumber(value, parameterName) {
        if (typeof value === 'number') {
            return value;
        }
        else {
            const valueNumber = parseFloat(value);
            if (!isNaN(valueNumber)) {
                return valueNumber;
            }
            else {
                throw new ErrorWktLiteral("Value " + value + " of " + parameterName + " is not a number");
            }
        }
    }
}
export class PointWktLiteral extends WktLiteral {
    constructor(long, lat, spatialReferenceSystem) {
        super(spatialReferenceSystem);
        this.long = WktLiteral.getNumber(long, "Point:longitude");
        this.lat = WktLiteral.getNumber(lat, "Point:latitude");
    }
    equals(obj) {
        if (obj instanceof PointWktLiteral) {
            const p = obj;
            if (p.long === this.long && p.lat === this.lat) {
                return true;
            }
        }
        return false;
    }
}
export class LinestringWktLiteral extends WktLiteral {
    constructor() {
        super(...arguments);
        this.points = [];
    }
    push(pointWktLiteral) {
        this.points.push(pointWktLiteral);
    }
}
export class EnvelopeWktLiteral extends WktLiteral {
    constructor(minLong, maxLong, maxLat, minLat, spatialReferenceSystem) {
        super(spatialReferenceSystem);
        this.minLong = WktLiteral.getNumber(minLong, "Envelope:minLong");
        this.maxLong = WktLiteral.getNumber(maxLong, "Envelope:maxLong");
        this.maxLat = WktLiteral.getNumber(maxLat, "Envelope:maxLat");
        this.minLat = WktLiteral.getNumber(minLat, "Envelope:minLat");
    }
}
export class PolygonWktLiteral extends WktLiteral {
    constructor() {
        super(...arguments);
        this.points = [];
    }
    push(pointWktLiteral) {
        this.points.push(pointWktLiteral);
    }
}
export class MultiPolygonWktLiteral extends WktLiteral {
    constructor() {
        super(...arguments);
        this.polygons = [];
    }
    push(polygonWktLiteral) {
        this.polygons.push(polygonWktLiteral);
    }
}
export class ErrorWktLiteral extends Error {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2t0TGl0ZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZ3Zpemxlci9Xa3RMaXRlcmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZFQUE2RTtBQUU3RSxNQUFNLE9BQWdCLFVBQVU7SUFLNUIsWUFBWSxzQkFBOEI7UUFDdEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixhQUF0QixzQkFBc0IsY0FBdEIsc0JBQXNCLEdBQUksdUNBQXVDLENBQUMsQ0FBQyxvQkFBb0I7SUFDekgsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVztRQUNyQixJQUFHLENBQUM7WUFDQSxnRkFBZ0Y7WUFDaEYsTUFBTSxVQUFVLEdBQUcsdURBQXVELENBQUM7WUFDM0UsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQyxJQUFHLFdBQVcsSUFBSSxJQUFJLEVBQUMsQ0FBQztnQkFDaEIsT0FBTyxJQUFJLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7WUFFRCwwSEFBMEg7WUFDMUgsTUFBTSxlQUFlLEdBQUcsOENBQThDLENBQUM7WUFDdkUsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUM7WUFDbEQsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3BELElBQUcsZ0JBQWdCLElBQUksSUFBSSxFQUFDLENBQUM7Z0JBQ3pCLElBQUksb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLElBQUksR0FBRyxJQUFJLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7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
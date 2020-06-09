import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator";
import {AfterAll, AfterEach, BeforeAll, BeforeEach} from "testyts/build/lib/decorators/afterAndBefore.decorator";
import {Test} from "testyts/build/lib/decorators/test.decorator";
import {expect} from "testyts/build/testyCore"
import {
    EnvelopeWktLiteral,
    LinestringWktLiteral,
    PointWktLiteral,
    PolygonWktLiteral,
    WktLiteral
} from "../sgvizler/WktLiteral";

@TestSuite() // @ts-ignore
export class WktLiteralTestSuite {

    @Test() // @ts-ignore
    async point1Test() {
        // Point(LONG LAT): A single point as described above (Note the lack of a comma)
        const point = WktLiteral.create("Point(2.1 5.1)");
        expect.toBeTrue(point instanceof PointWktLiteral);
        // Assert
        expect.toBeEqual((<PointWktLiteral> point).long, 2.1);
        expect.toBeEqual((<PointWktLiteral> point).lat, 5.1);
        expect.toBeEqual((<PointWktLiteral> point).spatialReferenceSystem, "http://www.wikidata.org/entity/Q42274");
    }

    @Test() // @ts-ignore
    async point2Test() {
        // Point(LONG LAT): A single point as described above (Note the lack of a comma)
        const point = WktLiteral.create(" <http://www.wikidata.org/entity/Q111> \n Point(2.1 5.1)");
        expect.toBeTrue(point instanceof PointWktLiteral);
        // Assert
        expect.toBeEqual((<PointWktLiteral> point).long, 2.1);
        expect.toBeEqual((<PointWktLiteral> point).lat, 5.1);
        expect.toBeEqual((<PointWktLiteral> point).spatialReferenceSystem, "http://www.wikidata.org/entity/Q111");
    }

    @Test() // @ts-ignore
    async linestring1Test() {
        // Linestring(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN): A line connecting the specified points (Commas between each point)
        const line = WktLiteral.create("Linestring(  1.5 1.6,1.8 1.9 ,5.2  6.2)");
        expect.toBeTrue(line instanceof LinestringWktLiteral);
        const points = (<LinestringWktLiteral> line).points;
        // Assert
        //console.log(points);
        expect.toBeEqual((<LinestringWktLiteral> line).spatialReferenceSystem, "http://www.wikidata.org/entity/Q42274");
        expect.toBeTrue(points[0].equals(new PointWktLiteral(1.5,1.6)));
        expect.toBeTrue(points[1].equals(new PointWktLiteral(1.8,1.9)));
        expect.toBeTrue(points[2].equals(new PointWktLiteral(5.2,6.2)));
        expect.toBeEqual(points[2].spatialReferenceSystem, "http://www.wikidata.org/entity/Q42274");
    }

    @Test() // @ts-ignore
    async linestring2Test() {
        // Linestring(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN): A line connecting the specified points (Commas between each point)
        const line = WktLiteral.create(" <http://www.wikidata.org/entity/Q111> \n Linestring(  1.5 1.6,1.8 1.9 ,5.2  6.2)");
        expect.toBeTrue(line instanceof LinestringWktLiteral);
        const points = (<LinestringWktLiteral> line).points;
        // Assert
        //console.log(points);
        expect.toBeEqual((<LinestringWktLiteral> line).spatialReferenceSystem, "http://www.wikidata.org/entity/Q111");
        expect.toBeTrue(points[0].equals(new PointWktLiteral(1.5,1.6)));
        expect.toBeTrue(points[1].equals(new PointWktLiteral(1.8,1.9)));
        expect.toBeTrue(points[2].equals(new PointWktLiteral(5.2,6.2)));
        expect.toBeEqual(points[2].spatialReferenceSystem, "http://www.wikidata.org/entity/Q111");
    }

    @Test() // @ts-ignore
    async envelope1Test() {
        // Envelope(minLong, maxLong, maxLat, minLat): A rectangle with the specified corners (Note the commas between each and especially note the somewhat odd ordering of (min, max, max, min)).
        const envelope = WktLiteral.create("Envelope( 1.5,1.6 , 1.8 ,       1.9 )");
        expect.toBeTrue(envelope instanceof EnvelopeWktLiteral);
        // Assert
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).minLong, 1.5);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).maxLong, 1.6);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).maxLat, 1.8);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).minLat, 1.9);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).spatialReferenceSystem, "http://www.wikidata.org/entity/Q42274");
    }


    @Test() // @ts-ignore
    async envelope2Test() {
        // Envelope(minLong, maxLong, maxLat, minLat): A rectangle with the specified corners (Note the commas between each and especially note the somewhat odd ordering of (min, max, max, min)).
        const envelope = WktLiteral.create("<http://www.wikidata.org/entity/Q111> \n   Envelope( 1.5,1.6 , 1.8 ,       1.9 )");
        expect.toBeTrue(envelope instanceof EnvelopeWktLiteral);
        // Assert
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).minLong, 1.5);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).maxLong, 1.6);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).maxLat, 1.8);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).minLat, 1.9);
        expect.toBeEqual((<EnvelopeWktLiteral> envelope).spatialReferenceSystem, "http://www.wikidata.org/entity/Q111");
    }

    @Test() // @ts-ignore
    async polygon1Test() {
        // Polygon(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN, LONG1 LAT1): A filled-in shape with the specified points (Note that a polygon must start and end with the same point, i.e., be closed)
        const polygon = WktLiteral.create("Polygon(  1.5 1.6,1.8 1.9 ,5.2  6.2,1.5 1.6)");
        expect.toBeTrue(polygon instanceof PolygonWktLiteral);
        // Assert

        const points = (<LinestringWktLiteral> polygon).points;
        expect.toBeEqual((<LinestringWktLiteral> polygon).spatialReferenceSystem, "http://www.wikidata.org/entity/Q42274");
        expect.toBeTrue(points[0].equals(new PointWktLiteral(1.5,1.6)));
        expect.toBeTrue(points[1].equals(new PointWktLiteral(1.8,1.9)));
        expect.toBeTrue(points[2].equals(new PointWktLiteral(5.2,6.2)));
        expect.toBeTrue(points[3].equals(new PointWktLiteral(1.5,1.6)));
        expect.toBeEqual(points[3].spatialReferenceSystem, "http://www.wikidata.org/entity/Q42274");
    }

    @Test() // @ts-ignore
    async polygon2Test() {
        // Polygon(LONG1 LAT1, LONG2 LAT2, ..., LONGN LATN, LONG1 LAT1): A filled-in shape with the specified points (Note that a polygon must start and end with the same point, i.e., be closed)
        const polygon = WktLiteral.create("<http://www.wikidata.org/entity/Q111> Polygon(  1.5 1.6,1.8 1.9 ,5.2  6.2,1.5 1.6)");
        expect.toBeTrue(polygon instanceof PolygonWktLiteral);
        // Assert

        const points = (<LinestringWktLiteral> polygon).points;
        expect.toBeEqual((<LinestringWktLiteral> polygon).spatialReferenceSystem, "http://www.wikidata.org/entity/Q111");
        expect.toBeTrue(points[0].equals(new PointWktLiteral(1.5,1.6)));
        expect.toBeTrue(points[1].equals(new PointWktLiteral(1.8,1.9)));
        expect.toBeTrue(points[2].equals(new PointWktLiteral(5.2,6.2)));
        expect.toBeTrue(points[3].equals(new PointWktLiteral(1.5,1.6)));
        expect.toBeEqual(points[3].spatialReferenceSystem, "http://www.wikidata.org/entity/Q111");
    }
}
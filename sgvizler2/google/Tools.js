/**
 * Tools
 * @class google.Tools
 * @memberof google
 */
export class Tools {
    static decodeFormatSize(value) {
        let result = value;
        if (Number.isNaN(Number(value))) {
            let patternPercent = /%/gi;
            let patternPixel = /px/gi;
            if (result.search(patternPixel) >= 0) {
                result = result.replace('px', '');
                if (!Number.isNaN(Number(result))) {
                    result = Number(result);
                }
            }
            else if (result.search(patternPercent) >= 0) {
                // do nothing
            }
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ29vZ2xlL1Rvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sS0FBSztJQUNQLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxLQUFVO1FBQ3RDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM5QixJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUE7WUFDMUIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFBO1lBRXpCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNqQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQztpQkFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzVDLGFBQWE7WUFDakIsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0NBQ0oifQ==
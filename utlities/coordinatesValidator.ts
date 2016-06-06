export class CoordinatesValidator {
	private static isFloat(n: number): boolean {
	    return Number(n) === n && n % 1 !== 0;
	}

	private static isValueInRange(value: number, min: number, max: number) {
		return (value >= min && value <= max);
	}

	public static isValidLatitude(latitude: number): boolean {
		// between -90 and 90
		return this.isFloat(latitude) && this.isValueInRange(latitude, -90, 90);
	}

	public static isValidLongitude(longitude: number): boolean {
		// between -180 and 180
		return this.isFloat(longitude) && this.isValueInRange(longitude, -180, 180);
	}
}

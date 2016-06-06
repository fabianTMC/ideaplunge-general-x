export class BasesResponses {
	public static CreatedBase(baseUUID): any {
		return {
			result: true,
			baseID: baseUUID
		}
	}

	public static FailedToCreateBase(): any {
		return {
			result: false,
			message: "Failed to create base."
		}
	}

	public static DuplicateCoordinates(latitude, longitude): any {
		return {
			result: false,
			message: "A base already exists at coordinates "+ latitude + ", " + longitude
		}
	}
}

import {CoordinatesValidator} from "../utlities/coordinatesValidator";

export interface ITrackCreationFormat {
	latitude: number,
	longitude: number
}

export function isITrackCreationFormat(obj: any): boolean {
	let result = (
		obj
		&&
		obj.latitude && CoordinatesValidator.isValidLatitude(obj.latitude)
		&&
		obj.longitude && CoordinatesValidator.isValidLongitude(obj.longitude)
	);

	// This is because when evaluating the code above, undefined might be returned
	// if keys are not set and boolean values if they are set and pass/fail the given criteria
	return result || false;
}

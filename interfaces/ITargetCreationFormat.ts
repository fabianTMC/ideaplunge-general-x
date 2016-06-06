import {CoordinatesValidator} from "../utlities/coordinatesValidator";

export interface ITargetCreationFormat {
	name: string,
	latitude: number,
	longitude: number
}

export enum TargetStatus {
	Active = 0,
	Destroyed = 1
}

export function isITargetCreationFormat(obj: any): boolean {
	let result = (
		obj
		&&
		obj.name && obj.name.length > 0
		&&
		obj.latitude && CoordinatesValidator.isValidLatitude(obj.latitude)
		&&
		obj.longitude && CoordinatesValidator.isValidLongitude(obj.longitude)
	);

	// This is because when evaluating the code above, undefined might be returned
	// if keys are not set and boolean values if they are set and pass/fail the given criteria
	return result || false;
}

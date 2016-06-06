import {CoordinatesValidator} from "../utlities/coordinatesValidator";

export interface IBaseCreationFormat {
	name: string,
	latitude: number,
	longitude: number
}

export function isIBaseCreationFormat(obj: any): boolean {
	return (
		obj
		&&
		obj.name && obj.name.length > 0
		&&
		obj.latitude && CoordinatesValidator.isValidLatitude(obj.latitude)
		&&
		obj.longitude && CoordinatesValidator.isValidLongitude(obj.longitude)
	);
}

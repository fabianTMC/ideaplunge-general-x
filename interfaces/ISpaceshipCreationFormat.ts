export interface ISpaceshipCreationFormat {
	name: string,
	homeBase: string
}

export function isISpaceshipCreationFormat(obj: any): boolean {
	let result = (
		obj
		&&
		obj.name && obj.name.length > 0
		&&
		obj.homeBase && obj.homeBase.length > 0
	);

	// This is because when evaluating the code above, undefined might be returned
	// if keys are not set and boolean values if they are set and pass/fail the given criteria
	return result || false;
}

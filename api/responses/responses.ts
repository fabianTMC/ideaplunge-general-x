import {BasesResponses} from "./basesResponses";

export class Responses {
	public static Bases = BasesResponses;

	public static GenericMongoError(): any {
		return {
			result: false,
			message: "A server error occurred. Please try again later."
		}
	}

	public static InvalidRequestBody(): any {
		return {
			result: false,
			message: "Invalid request body. Please check that the request data sent matches the documentation for this end point."
		}
	}
}

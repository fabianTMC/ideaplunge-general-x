export class SpaceshipResponses {
	public static TrackingSuccess(): any {
		return {
			result: true,
			message: "Spaceship tracked successfully."
		}
	}

	public static FailedToTrack(): any {
		return {
			result: false,
			message: "Failed to track spaceship."
		}
	}

	public static CreatedSpaceship(spaceshipUUID): any {
		return {
			result: true,
			spaceshipID: spaceshipUUID
		}
	}

	public static FailedToCreateSpaceship(): any {
		return {
			result: false,
			message: "Failed to create spaceship."
		}
	}

	public static CreatedTarget(targetUUID): any {
		return {
			result: true,
			targetID: targetUUID
		}
	}

	public static FailedToCreateTarget(): any {
		return {
			result: false,
			message: "Failed to create target."
		}
	}

	public static InvalidHomeBase(): any {
		return {
			result: false,
			message: "Invalid home base provided."
		}
	}

	public static InvalidSpaceship(): any {
		return {
			result: false,
			message: "Invalid spaceship provided."
		}
	}

	public static DuplicateSpaceship(name: string): any {
		return {
			result: false,
			message: "A spaceship already exists with the name "+ name
		}
	}
}

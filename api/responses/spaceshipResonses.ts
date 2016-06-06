export class SpaceshipResponses {
	public static CreatedSpaceship(spaceshipUUID): any {
		return {
			result: true,
			baseID: spaceshipUUID
		}
	}

	public static FailedToCreateSpaceship(): any {
		return {
			result: false,
			message: "Failed to create spaceship."
		}
	}

	public static InvalidHomeBase(): any {
		return {
			result: false,
			message: "Invalid home base provided."
		}
	}

	public static DuplicateSpaceship(name: string): any {
		return {
			result: false,
			message: "A spaceship already exists with the name "+ name
		}
	}
}

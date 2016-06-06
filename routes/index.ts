// THIS IS A CONVENIENCE CLASS FOR IMPORTING ALL THE ROUTES

import * as express from 'express';

// Import all the routes
import {BaseRoutes} from './bases';
import {SpaceshipRoutes} from './spaceships';

export class Routes {
	public bases: BaseRoutes;
	public spaceships: SpaceshipRoutes;

	constructor() {
		this.bases = new BaseRoutes();
		this.spaceships = new SpaceshipRoutes();
	}
}

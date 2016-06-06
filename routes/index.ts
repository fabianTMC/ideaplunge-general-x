// THIS IS A CONVENIENCE CLASS FOR IMPORTING ALL THE ROUTES

import * as express from 'express';

// Import all the routes
import {BaseRoutes} from './bases';

export class Routes {
	public bases: BaseRoutes;

	constructor() {
		this.bases = new BaseRoutes;
	}
}

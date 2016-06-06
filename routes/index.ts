// THIS IS A CONVENIENCE CLASS FOR IMPORTING ALL THE ROUTES

import * as express from 'express';

// Import all the routes
import {BaseRoutes} from './bases';
import {SpaceshipRoutes} from './spaceships';

import * as mongodb from "mongodb";

export class Routes {
	public bases: BaseRoutes;
	public spaceships: SpaceshipRoutes;

	constructor(app: any, db: mongodb.Db) {
		this.bases = new BaseRoutes();
		this.spaceships = new SpaceshipRoutes();

		app.post("/bases/create", (req, res) => {
			this.bases.create(req, res, db);
		});

        app.post("/spaceships/create", (req, res) => {
			this.spaceships.create(req, res, db);
		});

		app.post("/spaceships/:spaceship/target", (req, res) => {
			this.spaceships.target(req, res, db);
		});

		app.post("/spaceships/:spaceship/track", (req, res) => {
			this.spaceships.track(req, res, db);
		});
	}
}

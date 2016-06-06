// THIS IS A CONVENIENCE CLASS FOR IMPORTING ALL THE ROUTES

import * as express from 'express';

// Import all the routes
import {BaseRoutes} from './bases';
import {SpaceshipRoutes} from './spaceships';
import {UIRoutes} from './ui';

import * as mongodb from "mongodb";

export class Routes {
	public bases: BaseRoutes;
	public spaceships: SpaceshipRoutes;
	public ui: UIRoutes;

	constructor(app: any, db: mongodb.Db) {
		this.bases = new BaseRoutes();
		this.spaceships = new SpaceshipRoutes();
		this.ui = new UIRoutes();

		app.get("/", (req, res) => {
			this.ui.index(req, res);
		});

		app.get("/bases", (req, res) => {
			this.ui.bases(req, res);
		});

		app.get("/api/bases/get", (req, res) => {
			this.bases.getAll(req, res, db);
		});

		app.post("/api/bases/create", (req, res) => {
			this.bases.create(req, res, db);
		});

		app.get("/api/spaceships/get", (req, res) => {
			this.spaceships.getAll(req, res, db);
		});

        app.post("/api/spaceships/create", (req, res) => {
			this.spaceships.create(req, res, db);
		});

		app.post("/api/spaceships/:spaceship/target", (req, res) => {
			this.spaceships.target(req, res, db);
		});

		app.post("/api/spaceships/:spaceship/track", (req, res) => {
			this.spaceships.track(req, res, db);
		});
	}
}

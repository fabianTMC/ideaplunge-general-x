// THIS IS A CONVENIENCE CLASS FOR IMPORTING ALL THE ROUTES

import * as express from 'express';

// Import all the routes
import {BaseRoutes} from './bases';
import {SpaceshipRoutes} from './spaceships';
import {TargetRoutes} from './targets';
import {UIRoutes} from './ui';

import * as mongodb from "mongodb";

export class Routes {
	public bases: BaseRoutes;
	public spaceships: SpaceshipRoutes;
	public targets: TargetRoutes;
	public ui: UIRoutes;

	constructor(app: any, db: mongodb.Db) {
		this.bases = new BaseRoutes();
		this.spaceships = new SpaceshipRoutes();
		this.targets = new TargetRoutes();
		this.ui = new UIRoutes();

		app.get("/", (req, res) => {
			this.ui.index(req, res);
		});

		app.get("/bases", (req, res) => {
			this.ui.bases(req, res);
		});

		app.get("/spaceships", (req, res) => {
			this.ui.spaceships(req, res);
		});

		app.get("/targets", (req, res) => {
			this.ui.targets(req, res);
		});

		app.get("/track", (req, res) => {
			this.ui.track(req, res);
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

		app.post("/api/spaceships/:spaceship/track", (req, res) => {
			this.spaceships.track(req, res, db);
		});

		app.post("/api/spaceships/:spaceship/target", (req, res) => {
			this.targets.target(req, res, db);
		});

		app.get("/api/targets/get-active", (req, res) => {
			this.targets.getAllActive(req, res, db);
		});

		app.get("/api/targets/get-destroyed", (req, res) => {
			this.targets.getAllDestroyed(req, res, db);
		});
	}
}

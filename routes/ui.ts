import * as express from 'express';
import * as MongoDB from "mongodb";

export class UIRoutes {
	public index(req: express.Request, res: express.Response): void {
		res.render('index', {});
	}

	public bases(req: express.Request, res: express.Response): void {
		res.render('bases', {});
	}

	public spaceships(req: express.Request, res: express.Response): void {
		res.render('spaceships', {});
	}

	public targets(req: express.Request, res: express.Response): void {
		res.render('targets', {});
	}

	public track(req: express.Request, res: express.Response): void {
		res.render('track', {});
	}
}

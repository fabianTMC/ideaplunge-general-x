import * as express from 'express';

export class BaseRoutes {
	public create(req: express.Request, res: express.Response): void {
		res.send("Create a base here");
	}
}

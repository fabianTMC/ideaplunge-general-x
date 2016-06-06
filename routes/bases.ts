import * as express from 'express';
import * as MongoDB from "mongodb";

import {BasesAPI} from "../api/bases";
import {IBaseCreationFormat, isIBaseCreationFormat} from "../interfaces/IBaseCreationFormat";

import {Responses} from "../api/responses/responses";

export class BaseRoutes {
	public create(req: express.Request, res: express.Response, db: MongoDB.Db): void {
		let base: IBaseCreationFormat = req.body;

		if(isIBaseCreationFormat(base)) {
			BasesAPI.create(db, base)
				.then((base) => {
					if(base.insertedCount && base.insertedCount == 1) {
						res.send(Responses.Bases.CreatedBase(base.insertedId));
					} else {
						// This condition will have insertedCount == 0 since we used insertOne
						// in the create function
						res.send(Responses.Bases.FailedToCreateBase());
					}
				}, (err) => {
					if(err.code && err.code == 11000) {
						res.send(Responses.Bases.DuplicateCoordinates(base.latitude, base.longitude));
					} else {
						console.log(err);
						res.send(Responses.GenericMongoError());
					}
				});
		} else {
			res.send(Responses.InvalidRequestBody());
		}
	}
}

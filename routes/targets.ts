import * as express from 'express';
import * as MongoDB from "mongodb";

import {TargetsAPI} from "../api/targets";
import {ITargetCreationFormat, isITargetCreationFormat} from "../interfaces/ITargetCreationFormat";
import {TargetStatus} from "../interfaces/ITargetCreationFormat";

import {Responses} from "../api/responses/responses";

export class TargetRoutes {
	public getAllDestroyed(req: express.Request, res: express.Response, db: MongoDB. Db): void {
		TargetsAPI.getAll(db, TargetStatus.Destroyed)
			.then((targets) => {
				// Check if the spaceship was valid
				res.send(targets);
			}, (err) => {
				console.log(err);
				res.send(Responses.GenericMongoError());
			});
	}

	public getAllActive(req: express.Request, res: express.Response, db: MongoDB. Db): void {
		TargetsAPI.getAll(db, TargetStatus.Active)
			.then((targets) => {
				// Check if the spaceship was valid
				res.send(targets);
			}, (err) => {
				console.log(err);
				res.send(Responses.GenericMongoError());
			});
	}

	public target(req: express.Request, res: express.Response, db: MongoDB. Db): void {
		let target: ITargetCreationFormat = req.body;

		if(isITargetCreationFormat(target) && (req.params.spaceship && req.params.spaceship.length > 0)) {
			TargetsAPI.createTarget(db, target, req.params.spaceship)
				.then((target) => {
					// Check if the spaceship was valid
					if(!target) {
						res.send(Responses.Spaceships.InvalidSpaceship());
					} else {
						if(target.insertedCount && target.insertedCount == 1) {
							res.send(Responses.Spaceships.CreatedTarget(target.ops[0].uuid));
						} else {
							// This condition will have insertedCount == 0 since we used insertOne
							// in the create function
							res.send(Responses.Spaceships.FailedToCreateTarget());
						}
					}
				}, (err) => {
					console.log(err);
					res.send(Responses.GenericMongoError());
				});
		} else {
			res.send(Responses.InvalidRequestBody());
		}
	}
}

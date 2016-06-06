import * as express from 'express';
import * as MongoDB from "mongodb";

import {SpaceshipsAPI} from "../api/spaceships";
import {ISpaceshipCreationFormat, isISpaceshipCreationFormat} from "../interfaces/ISpaceshipCreationFormat";
import {ITargetCreationFormat, isITargetCreationFormat} from "../interfaces/ITargetCreationFormat";
import {ITrackCreationFormat, isITrackCreationFormat} from "../interfaces/ITrackCreationFormat";

import {Responses} from "../api/responses/responses";

export class SpaceshipRoutes {
	public track(req: express.Request, res: express.Response, db: MongoDB. Db): void {
		let position: ITrackCreationFormat = req.body;

		if(isITrackCreationFormat(position) && (req.params.spaceship && req.params.spaceship.length > 0)) {
			SpaceshipsAPI.track(db, position, req.params.spaceship)
				.then((target) => {
					// Check if the spaceship was valid
					if(!target) {
						res.send(Responses.Spaceships.InvalidSpaceship());
					} else {
						if(target.insertedCount && target.insertedCount == 1) {
							res.send(Responses.Spaceships.TrackingSuccess());
						} else {
							// This condition will have insertedCount == 0 since we used insertOne
							// in the create function
							res.send(Responses.Spaceships.FailedToTrack());
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

	public target(req: express.Request, res: express.Response, db: MongoDB. Db): void {
		let target: ITargetCreationFormat = req.body;

		if(isITargetCreationFormat(target) && (req.params.spaceship && req.params.spaceship.length > 0)) {
			SpaceshipsAPI.createTarget(db, target, req.params.spaceship)
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

	public create(req: express.Request, res: express.Response, db: MongoDB.Db): void {
		let spaceship: ISpaceshipCreationFormat = req.body;

		if(isISpaceshipCreationFormat(spaceship)) {
			SpaceshipsAPI.create(db, spaceship)
				.then((spaceship) => {
					// Check if the base was valid
					if(!spaceship) {
						res.send(Responses.Spaceships.InvalidHomeBase());
					} else {
						if(spaceship.insertedCount && spaceship.insertedCount == 1) {
							res.send(Responses.Spaceships.CreatedSpaceship(spaceship.ops[0].uuid));
						} else {
							// This condition will have insertedCount == 0 since we used insertOne
							// in the create function
							res.send(Responses.Spaceships.FailedToCreateSpaceship());
						}
					}
				}, (err) => {
					console.log(err);
					if(err.code && err.code == 11000) {
						res.send(Responses.Spaceships.DuplicateSpaceship(spaceship.name));
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

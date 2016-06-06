import * as express from 'express';
import * as MongoDB from "mongodb";

import {SpaceshipsAPI} from "../api/spaceships";
import {ISpaceshipCreationFormat, isISpaceshipCreationFormat} from "../interfaces/ISpaceshipCreationFormat";

import {Responses} from "../api/responses/responses";

export class SpaceshipRoutes {
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
							res.send(Responses.Spaceships.CreatedSpaceship(spaceship.insertedId));
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

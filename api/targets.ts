/// <reference path="../typings/q/Q.d.ts"/>
/// <reference path="../typings/uuid/UUID.d.ts"/>

import * as MongoDB from "mongodb";
import * as Q from "q";
import * as UUID from "uuid";

import {SpaceshipsAPI} from "./spaceships";
import {ITargetCreationFormat, TargetStatus} from "../interfaces/ITargetCreationFormat";

export class TargetsAPI {
	private static collectionName = "targets";

	public static getAll(db: MongoDB.Db, status: number): Q.Promise<any> {
		let deferred = Q.defer<any>();

		let collection = db.collection(this.collectionName);

		let keysToReturn = {
			name: true,
			latitude: true,
			longitude: true,
			uuid: true,
			destroyedAt: true,
			_id: false
		}

		collection.find({status: status}).project(keysToReturn).toArray((err, docs) => {
			if(err) {
				console.log("Could not find targets.");
				console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(docs);
			}
		})

		return deferred.promise;
	}

	public static createTarget(db: MongoDB.Db, target: ITargetCreationFormat, spaceship: string): Q.Promise<any> {
		let deferred = Q.defer<any>();

		SpaceshipsAPI.isValidSpaceship(db, spaceship)
		.then((spaceship) => {
			if(spaceship) {
				let collection = db.collection(this.collectionName);

				// Format the creation object
				let targetToInsert = {
					name: target.name,
					latitude: target.latitude,
					longitude: target.longitude,
					status: TargetStatus.Active,
					uuid: UUID.v4(),
					spaceship: spaceship.uuid
				}

				collection.insertOne(targetToInsert, function (err, docs) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(docs);
					}
				});
			} else {
				deferred.resolve(null);
			}
		}, (err) => {
			deferred.reject(err);
		});

		return deferred.promise;
	}
}

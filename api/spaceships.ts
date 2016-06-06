/// <reference path="../typings/q/Q.d.ts"/>
/// <reference path="../typings/uuid/UUID.d.ts"/>

import {ISpaceshipCreationFormat} from "../interfaces/ISpaceshipCreationFormat";
import {ITargetCreationFormat, TargetStatus} from "../interfaces/ITargetCreationFormat";
import {ITrackCreationFormat} from "../interfaces/ITrackCreationFormat";
import {BasesAPI} from "./bases";

import * as MongoDB from "mongodb";
import * as Q from "q";
import * as UUID from "uuid";

import * as CONFIG from "../config";

export class SpaceshipsAPI {
	private static collectionName = "spaceships";
	private static targetsCollectionName = "targets";
	private static trackCollectionName = "tracking";

	public static getAll(db: MongoDB.Db): Q.Promise<any> {
		let deferred = Q.defer<any>();

		let collection = db.collection(this.collectionName);

		let keysToReturn = {
			name: true,
			currentLatitude: true,
			currentLongitude: true,
			uuid: true,
			_id: false
		}

		collection.find().project(keysToReturn).toArray((err, docs) => {
			if(err) {
				console.log("Could not find spaceships.");
				console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(docs);
			}
		})

		return deferred.promise;
	}

	public static track(db: MongoDB.Db, target: ITrackCreationFormat, spaceship: string): Q.Promise<any> {
		let deferred = Q.defer<any>();

		this.isValidSpaceship(db, spaceship)
		.then((spaceship) => {
			if(spaceship) {
				// Lets check if the base is a valid base
				let collection = db.collection(this.trackCollectionName);

				// Format the creation object
				let trackingData = {
					latitude: target.latitude,
					longitude: target.longitude,
					spaceship: spaceship.uuid,
					timestamp: Date.now()
				}

				collection.insertOne(trackingData, (err, docs) => {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(docs);

						// Update the currentLatitude and currentLongitude of the given spaceship
						let collection = db.collection(this.collectionName);

						// Define the targets to match
						let targetsToMatch = {
							uuid: spaceship.uuid
						}

						let targetDataToSet = {
							currentLatitude: target.latitude,
							currentLongitude: target.longitude,
							updatedAt: trackingData.timestamp
						}

						collection.updateOne(targetsToMatch, {$set: targetDataToSet}, (err, r) => {
							// Since this operation is not going to be show to the user, just log the errors
							if(err) {
								console.log("Could not update spaceship currentLatitude and currentLongitude");
								console.log(err);
							}

							// Update all targets for the specified spaceship
							// If the current position of the spaceship matches any target,
							// set that target as destroyed
							let collection = db.collection(this.targetsCollectionName);

							// Define the targets to match
							let targetsToMatch = {
								latitude: target.latitude,
								longitude: target.longitude,
								status: TargetStatus.Active,
								spaceship: spaceship.uuid
							}

							let targetDataToSet = {
								status: TargetStatus.Destroyed,
								destroyedAt: Date.now()
							}

							collection.updateMany(targetsToMatch, {$set: targetDataToSet}, (err, r) => {
								// Since this operation is not going to be show to the user, just log the errors
								if(err) {
									console.log("Could not update targets at new spaceship position");
									console.log(err);
								}
							})
						});
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

	public static createTarget(db: MongoDB.Db, target: ITargetCreationFormat, spaceship: string): Q.Promise<any> {
		let deferred = Q.defer<any>();

		this.isValidSpaceship(db, spaceship)
		.then((spaceship) => {
			if(spaceship) {
				// Lets check if the base is a valid base
				let collection = db.collection(this.targetsCollectionName);

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

	public static isValidSpaceship(db: MongoDB.Db, spaceshipUUID: string): Q.Promise<any> {
		let deferred = Q.defer<any>();

		let collection = db.collection(this.collectionName);

		collection.find({uuid: spaceshipUUID}).limit(1).next((err, docs) => {
		  if (err) {
		      deferred.reject(err);
		  } else {
		      deferred.resolve(docs);
		  }
		});

		return deferred.promise;
	}

	public static create(db: MongoDB.Db, spaceship: ISpaceshipCreationFormat): Q.Promise<any> {
		let deferred = Q.defer<any>();

		// Lets check if the base is a valid base
		BasesAPI.isValidBase(db, spaceship.homeBase)
		.then((baseDetails) => {
			if(baseDetails) {
				let collection = db.collection(this.collectionName);

				// Format the creation object
				let spaceshipToInsert = {
					name: spaceship.name,
					homeBase: spaceship.homeBase,
					currentLatitude: baseDetails.latitude,
					currentLongitude: baseDetails.longitude,
					uuid: UUID.v4()
				}

				collection.insertOne(spaceshipToInsert, function (err, docs) {
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
		})

		return deferred.promise;
	}
}

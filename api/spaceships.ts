/// <reference path="../typings/q/Q.d.ts"/>
/// <reference path="../typings/uuid/UUID.d.ts"/>

import {ISpaceshipCreationFormat} from "../interfaces/ISpaceshipCreationFormat";
import {BasesAPI} from "./bases";

import * as MongoDB from "mongodb";
import * as Q from "q";
import * as UUID from "uuid";

import * as CONFIG from "../config";

export class SpaceshipsAPI {
	private static collectionName = "spaceships";

	public static create(spaceship: ISpaceshipCreationFormat): Q.Promise<any> {
		let deferred = Q.defer<any>();

		// Lets check if the base is a valid base
		BasesAPI.isValidBase(spaceship.homeBase)
		.then((baseDetails) => {
			if(baseDetails) {
				new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
				  if(err) {
					  throw err;
				  } else {
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

/// <reference path="../typings/q/Q.d.ts"/>
/// <reference path="../typings/uuid/UUID.d.ts"/>

import {IBaseCreationFormat} from "../interfaces/IBaseCreationFormat";

import * as Q from "q";
import * as UUID from "uuid";
import * as MongoDB from "mongodb";

export class BasesAPI {
	private static collectionName = "bases";

	public static getAll(db: MongoDB.Db): Q.Promise<any> {
		let deferred = Q.defer<any>();

		let collection = db.collection(this.collectionName);

		let keysToReturn = {
			name: true,
			latitude: true,
			longitude: true,
			uuid: true,
			_id: false
		}

		collection.find().project(keysToReturn).toArray((err, docs) => {
			if(err) {
				console.log("Could not find bases.");
				console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(docs);
			}
		})

		return deferred.promise;
	}

	public static isValidBase(db: MongoDB.Db, baseUUID: string): Q.Promise<any> {
		let deferred = Q.defer<any>();

		let collection = db.collection(this.collectionName);

		collection.find({uuid: baseUUID}).limit(1).next((err, docs) => {
		  if (err) {
		      deferred.reject(err);
		  } else {
		      deferred.resolve(docs);
		  }
		});

		return deferred.promise;
	}

	public static create(db: MongoDB. Db, base: IBaseCreationFormat): Q.Promise<any> {
		let deferred = Q.defer<any>();

		let collection = db.collection(this.collectionName);

		// Format the creation object
		let baseToInsert = {
		name: base.name,
			latitude: base.latitude,
			longitude: base.longitude,
			uuid: UUID.v4()
		}

		collection.insertOne(baseToInsert, function (err, docs) {
		  if (err) {
		      deferred.reject(err);
		  } else {
		      deferred.resolve(docs);
		  }
	  	});

		return deferred.promise;
	}
}

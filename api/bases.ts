/// <reference path="../typings/q/Q.d.ts"/>
/// <reference path="../typings/uuid/UUID.d.ts"/>

import {IBaseCreationFormat} from "../interfaces/IBaseCreationFormat";

import * as MongoDB from "mongodb";
import * as Q from "q";
import * as UUID from "uuid";

import * as CONFIG from "../config";

export class BasesAPI {
	private static collectionName = "bases";

	public static isValidBase(baseUUID: string): Q.Promise<any> {
		let deferred = Q.defer<any>();

		new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
		  if(err) {
			  throw err;
		  } else {
			  let collection = db.collection(this.collectionName);

			  collection.find({uuid: baseUUID}).limit(1).next((err, docs) => {
	              if (err) {
	                  deferred.reject(err);
	              } else {
	                  deferred.resolve(docs);
	              }
	          });
		  }
		});

		return deferred.promise;
	}

	public static create(base: IBaseCreationFormat): Q.Promise<any> {
		let deferred = Q.defer<any>();

		new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
		  if(err) {
			  throw err;
		  } else {
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
		  }
		});

		return deferred.promise;
	}
}

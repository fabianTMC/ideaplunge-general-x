/// <reference path="../typings/q/Q.d.ts"/>
/// <reference path="../typings/uuid/UUID.d.ts"/>

import {IBaseCreationFormat} from "../interfaces/IBaseCreationFormat";

import * as MongoDB from "mongodb";
import * as Q from "q";
import * as UUID from "uuid";

import * as CONFIG from "../config";

export class BasesAPI {
	private static collectionName = "bases";

	public static create(base: IBaseCreationFormat): Q.Promise<any> {
		let deferred = Q.defer<any>();

		new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
		  if(err) {
			  throw err;
		  } else {
			  let collection = db.collection(this.collectionName);

			  // Attach a UUID to this base
			  base['uuid'] = UUID.v4();

			  collection.insertOne(base, function (err, docs) {
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

/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import * as MongoDB from "mongodb";
import * as CONFIG from "../config";

import {BasesAPI} from "../api/bases";

// Enable chai to work with promises
chai.use(chaiAsPromised);

describe('BasesAPI tests', () => {
	// typescript will not allow for an invalid interface object to be passed
	// so that will be tested in the routes

	let newBase = {
	    name: "Hello Place",
	    latitude: 12.1,
	    longitude: 24.2
	};

	// Connect to MongoDB
	new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
	  if(err) {
	      throw err;
	  } else {
	  	it('should pass as this is a new base', () => {
	          return chai.expect(BasesAPI.create(db, newBase))
	  			.to.eventually.be.fulfilled;
	  	});

	  	it('should fail as this is a duplicate base', () => {
	          return chai.expect(BasesAPI.create(db, newBase))
	  			.to.eventually.be.rejected;
	  	});
	  }
	});
});

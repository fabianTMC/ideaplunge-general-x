/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

import * as chai from 'chai';

import {isIBaseCreationFormat} from "../interfaces/IBaseCreationFormat";

describe('isIBaseCreationFormat tests', () => {
	let validFormat = {
	    name: "Hello Place",
	    latitude: 12.1,
	    longitude: 24.2
	};

	let invalidFormats = [
		{},
		{name: "Hello"},
		{latitude: 12.1},
		{longitude: 24.2},
		{latitude: 12.1, longitude: 24.2},
		{name: "", latitude: 12.1, longitude: 24.2},
		{name: "Hello Place", latitude: 12.1, longitude: "24.2"},
		{name: "Hello Place", latitude: "12.1", longitude: 24.2},
		{name: "Hello Place", latitude: "12.1", longitude: "24.2"}
	]

	for(let i = 0; i < invalidFormats.length; i++) {
		it('should fail the invalid request format: '+JSON.stringify(invalidFormats[i]), () => {
	        return chai.expect(isIBaseCreationFormat(invalidFormats[i])).to.be.false;
		});
	}

	it('should pass the valid request format: '+validFormat, () => {
		return chai.expect(isIBaseCreationFormat(validFormat)).to.be.true;
	});
});

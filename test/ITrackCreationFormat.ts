/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

import * as chai from 'chai';

import {isITrackCreationFormat} from "../interfaces/ITrackCreationFormat";

describe('isITrackCreationFormat tests', () => {
	let validFormat = {
	    latitude: 12.1,
	    longitude: 24.2
	};

	let invalidFormats = [
		{},
		{latitude: 12.1},
		{longitude: 24.2},
		{latitude: 12.1, longitude: ""},
		{latitude: "", longitude: 24.2},
		{latitude: 12.1, longitude: "24.2"},
		{latitude: "12.1", longitude: 24.2},
		{latitude: "12.1", longitude: "24.2"}
	]

	for(let i = 0; i < invalidFormats.length; i++) {
		it('should fail the invalid request format: '+JSON.stringify(invalidFormats[i]), () => {
	        return chai.expect(isITrackCreationFormat(invalidFormats[i])).to.be.false;
		});
	}

	it('should pass the valid request format: '+validFormat, () => {
		return chai.expect(isITrackCreationFormat(validFormat)).to.be.true;
	});
});

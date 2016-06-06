/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

import * as chai from 'chai';

import {isISpaceshipCreationFormat} from "../interfaces/ISpaceshipCreationFormat";

describe('isISpaceCreationFormat tests', () => {
	let validFormat = {
	    name: "Hello Place",
	    homeBase: "c7ea42ca-7846-461c-97cc-20a58861802c"
	};

	let invalidFormats = [
		{},
		{name: "Hello"},
		{homeBase: "c7ea42ca-7846-461c-97cc-20a58861802c"},
		{name: "", homeBase: "c7ea42ca-7846-461c-97cc-20a58861802c"},
		{name: "Hello", homeBase: ""},
		{name: "", homeBase: ""},

	]

	for(let i = 0; i < invalidFormats.length; i++) {
		it('should fail the invalid request format: '+JSON.stringify(invalidFormats[i]), () => {
	        return chai.expect(isISpaceshipCreationFormat(invalidFormats[i])).to.be.false;
		});
	}

	it('should pass the valid request format: '+validFormat, () => {
		return chai.expect(isISpaceshipCreationFormat(validFormat)).to.be.true;
	});
});

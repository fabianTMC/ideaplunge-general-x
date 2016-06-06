/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

import * as chai from 'chai';

import {CoordinatesValidator} from "../utlities/coordinatesValidator";

describe('CoordinatesValidator tests', () => {
	it('should accept 12.4 as a valid latitude', () => {
        return chai.expect(CoordinatesValidator.isValidLatitude(12.4)).to.be.true;
	});

	it('should accept -89.4 as a valid latitude', () => {
        return chai.expect(CoordinatesValidator.isValidLatitude(-89.4)).to.be.true;
	});

	// Disabled since typescript will not allow for it due to type differences
	// it('should not accept "12.4" as a valid latitude', () => {
    //     return chai.expect(CoordinatesValidator.isValidLatitude("12.4")).to.be.false;
	// });

	it('should not accept 91 as a valid latitude', () => {
        return chai.expect(CoordinatesValidator.isValidLatitude(91)).to.be.false;
	});

	it('should not accept -91 as a valid latitude', () => {
        return chai.expect(CoordinatesValidator.isValidLatitude(-91)).to.be.false;
	});

	it('should accept 120.4 as a valid longitude', () => {
        return chai.expect(CoordinatesValidator.isValidLongitude(120.4)).to.be.true;
	});

	it('should accept -179.9 as a valid longitude', () => {
        return chai.expect(CoordinatesValidator.isValidLongitude(-179.9)).to.be.true;
	});

	// Disabled since typescript will not allow for it due to type differences
	// it('should not accept "12.4" as a valid longitude', () => {
    //     return chai.expect(CoordinatesValidator.isValidLongitude("12.4")).to.be.true;
	// });

	it('should not accept -191 as a valid longitude', () => {
        return chai.expect(CoordinatesValidator.isValidLongitude(-191)).to.be.false;
	});
});

const expect = require('expect');

const { isValidString } = require('../utils/validation');

describe('isValidString', () => {
	it('should return true if values are valid strings', () => {
		const valid = isValidString('validString!!!');
		const someSpaces = isValidString('       validString!!!       ');

		expect(valid).toBeTruthy();
		expect(someSpaces).toBeTruthy();
	});

	it('should return false if values are not valid strings', () => {
		const spaces = isValidString('     ');
		const numbers = isValidString(123);

		expect(spaces).toBeFalsy();
		expect(numbers).toBeFalsy();
	});
});

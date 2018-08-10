const expect = require('expect');

const { generateMessage } = require('../utils/message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const testMsg = generateMessage('Luke', 'I’m Luke Skywalker. I’m here to rescue you.');

		expect(testMsg.from).toBe('Luke');
		expect(testMsg.text).toBe('I’m Luke Skywalker. I’m here to rescue you.');
	});
});

const generateMessage = (from, text) => ({
	from,
	text,
	createdAt: new Date().getTime(),
});

module.exports = { generateMessage };

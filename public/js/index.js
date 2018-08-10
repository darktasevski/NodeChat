var socket = io();

socket.on('connect', function() {
	console.log('Connected');

	socket.emit('createMsg', {
		from: 'Luke',
		text: 'I know, lolz',
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected');
});

socket.on('newMsg', function(email) {
	console.log('New email arrived', email);
});

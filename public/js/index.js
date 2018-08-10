var socket = io();

socket.on('connect', function() {
	console.log('Connected');
});

socket.on('disconnect', function() {
	console.log('Disconnected');
});

socket.on('newMsg', function(email) {
	console.log('New email arrived', email);
});

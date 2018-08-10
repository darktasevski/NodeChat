var socket = io();
var locationButton = jQuery('#send-location');

socket.on('connect', function() {
	console.log('Connected');
});

socket.on('disconnect', function() {
	console.log('Disconnected');
});

socket.on('newMsg', function(message) {
	console.log('New message arrived', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from} -- ${message.text}`);

	jQuery('#message-list').append(li);
});

// Example of client-side event acknowledgement
socket.emit(
	'createMsg',
	{
		from: 'Frank',
		text: 'Damn',
	},
	function() {
		console.log('Message sent');
	}
);

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit(
		'createMsg',
		{
			from: jQuery('[name=author]').val(),
			text: jQuery('[name=message]').val(),
		},
		function() {
			console.log('Message sent');
		}
	);
});

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Please enable geolocation');
	}

	navigator.geolocation.getCurrentPosition(
		function(position) {
			socket.emit('createLocationMsg', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		},
		function(arguments) {
			alert('Unable to fetch location');
		}
	);
});

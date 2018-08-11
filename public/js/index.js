var socket = io();
var locationButton = jQuery('#send-location');

socket.on('connect', function() {
	console.log('Connected');
});

socket.on('disconnect', function() {
	console.log('Disconnected');
});

socket.on('newMsg', function(message) {
	var li = jQuery('<li></li>');
	var formattedTime = moment(message.createdAt).format('h:mm a');
	li.text(`${formattedTime} - ${message.from}: ${message.text}`);

	jQuery('#message-list').append(li);
	console.log('New message arrived', message);
});

socket.on('newLocationMsg', function(message) {
	var li = jQuery('<li></li>');
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var a = jQuery(`<a target="_blank">My current location</a>`);

	li.text(`${formattedTime} - ${message.from}: `);
	a.attr('href', message.url);

	li.append(a);
	jQuery('#message-list').append(li);
});

// Example of client-side event acknowledgement
// socket.emit(
// 	'createMsg',
// 	{
// 		from: 'Frank',
// 		text: 'Damn',
// 	},
// 	function() {
// 		console.log('Message sent');
// 	}
// );

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var authorInput = jQuery('[name=author]');
	var textInput = jQuery('[name=message]');

	socket.emit(
		'createMsg',
		{
			from: authorInput.val(),
			text: textInput.val(),
		},
		function() {
			console.log('Message sent');
			authorInput.val('');
			textInput.val('');
		}
	);
});

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Please enable geolocation');
	}

	this.attr('disabled', 'disabled').text('Locating...');

	navigator.geolocation.getCurrentPosition(
		function(position) {
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMsg', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		},
		function(arguments) {
			locationButton.removeAttr('disabled').text('Send location');
			alert('Unable to fetch location');
		}
	);
});

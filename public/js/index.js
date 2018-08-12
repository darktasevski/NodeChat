var socket = io();
var locationButton = jQuery('#send-location');

function scrollToBottom() {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected');
});

socket.on('updateUserList', function(users) {
	var ul = jQuery('<ul></ul>');

	users.forEach(function(user) {
		var li = `<li>${user.name}</li>`;
		ul.append(li);
	});

	jQuery('#users').html(ul);
});

socket.on('newMsg', function(message) {
	var template = jQuery('#message-template').html();
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime,
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMsg', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime,
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var textInput = jQuery('[name=message]');

	socket.emit(
		'createMsg',
		{
			text: textInput.val(),
		},
		function() {
			textInput.val('');
		}
	);
});

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Please enable geolocation');
	}

	locationButton.attr('disabled', 'disabled').text('Locating...');

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

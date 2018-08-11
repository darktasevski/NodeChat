const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isValidString } = require('./utils/validation');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static(PUBLIC_PATH));

io.on('connection', socket => {
	console.log('New user connection!');

	// Welcome new user when he/she establishes connection
	socket.emit('newMsg', generateMessage('Admin', 'Welcome to the channel!'));

	// Broadcast message to everyone but a user who sent message
	socket.broadcast.emit('newMsg', generateMessage('Admin', 'New user joined channel.'));

	socket.on('join', (params, callback) => {
		if (isValidString(params.name) && isValidString(params.room)) {
			callback();
		} else {
			callback('Name and room name are required!');
		}
	});

	socket.on('createMsg', (newMsg, callback) => {
		console.log('createMsg', newMsg);

		io.emit('newMsg', generateMessage(newMsg.from, newMsg.text));
		callback();
	});

	socket.on('createLocationMsg', coords => {
		io.emit(
			'newLocationMsg',
			generateLocationMessage('Admin', coords.latitude, coords.longitude)
		);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

app.get('/', (req, res) => {
	res.send('Hello');
});

server.listen(PORT, () => console.log(`Server up and runnin' on port ${PORT}`));

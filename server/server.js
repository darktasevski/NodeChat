const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

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

	socket.on('createMsg', (newMsg, callback) => {
		console.log('createMsg', newMsg);

		io.emit('newMsg', generateMessage(newMsg.from, newMsg.text));
		callback();
	});

	socket.on('createLocationMsg', coords => {
		io.emit(
			'newMsg',
			generateMessage('Admin', `Latitude: ${coords.latitude}, longitude: ${coords.longitude}`)
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

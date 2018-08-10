const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const socketIO = require('socket.io');

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

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

app.get('/', (req, res) => {
	res.send('Hello');
});

server.listen(PORT, () => console.log(`Server up and runnin' on port ${PORT}`));

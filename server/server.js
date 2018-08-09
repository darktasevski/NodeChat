const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(PORT, () => console.log(`Server up and runnin' on port ${PORT}`));

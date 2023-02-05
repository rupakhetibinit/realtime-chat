import express from 'express';
const app = express();
const http = require('http').Server(app);
import cors from 'cors';
import { Server } from 'socket.io';
const PORT = 8000;
app.use(cors);

app.get('/api', (req, res) => {
	res.json({
		message: 'Hello world',
	});
});

const io = new Server({
	cors: {
		origin: 'http://localhost:4000',
	},
});

io.on('connection', (socket) => {
	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

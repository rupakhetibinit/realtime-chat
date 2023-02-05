import express from 'express';
import Message from '../types/Message';
const app = express();
import User from '../types/User';
const http = require('http').Server(app);
import cors from 'cors';
import { Socket } from 'socket.io';
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
	},
});
const PORT = 8000;
let users: User[] = [];
app.use(cors);

io.on('connection', (socket: Socket) => {
	console.log(`${socket.id} just connected`);
	console.log(users);
	socket.on('disconnect', () => {
		users = users.filter((user) => user.socketID !== socket.id);
		io.emit('newUserResponse', users);
		console.log('🔥: A user disconnected');
	});

	socket.on('message', (data: Message) => {
		console.log('a message was just sent');
		io.emit('messageResponse', data);
	});

	socket.on('newUser', (data: User) => {
		console.log('a user just connected');
		if (users.filter((i) => data.socketID === i.socketID).length === 0) {
			users.push(data);
		}
		console.log(users);
		io.emit('newUserResponse', users);
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

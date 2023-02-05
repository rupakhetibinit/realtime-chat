import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import User from '../../../types/User';

type Props = {
	socket: Socket | undefined;
};

const UserList = ({ socket }: Props) => {
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		if (socket !== null || undefined) {
			socket?.on('newUserResponse', (data: User[]) => setUsers(data));
		}
	}, [socket, users]);

	return (
		<div className='flex flex-col px-6'>
			<h1 className='font-bold text-2xl'>Active Users</h1>
			{users.map(({ userName, socketID }) => (
				<div
					className={clsx(socketID === socket?.id && 'text-blue-500')}
					key={userName}>
					{userName} {socketID === socket?.id && <div>(You)</div>}
				</div>
			))}
		</div>
	);
};

export default UserList;

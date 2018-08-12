const expect = require('expect');

const Users = require('../utils/users');

describe('Users', () => {
	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{
				id: 58718,
				name: 'Darko',
				room: 'Star Wars',
			},
			{
				id: 53318,
				name: 'Mathew',
				room: 'Star Wars',
			},
			{
				id: 58714,
				name: 'John',
				room: 'Star Trek',
			},
			{
				id: 58328,
				name: 'Jane',
				room: 'Star Trek',
			},
		];
	});

	it('should add new user', () => {
		const user = { id: 123, name: 'Darko', room: 'Star Wars' };

		users.addUser(user.id, user.name, user.room);
		expect(users.users.find(_user => _user.id === user.id)).toEqual(user);
	});

	it('should remove user', () => {
		expect(users.users.find(_user => _user.id === 58328)).toBeTruthy();

		users.removeUser(58328);

		expect(users.users.length).toBe(3);
		expect(users.users.find(_user => _user.id === 58328)).toBeFalsy();
	});

	it('should find user by id', () => {
		const user = users.getUser(53318);

		expect(user).toEqual(users.users[1]);
	});

	it('should returns all users that are in the same room', () => {
		const roomUsers = users.getUserList('Star Wars');

		expect(roomUsers.length).toBe(2);
		expect(roomUsers[0]).toEqual(users.users[0]);
		expect(roomUsers[1]).toEqual(users.users[1]);
	});
});

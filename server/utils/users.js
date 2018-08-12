class Users {
	constructor() {
		this.users = [];
	}

	// Add User (id, name, room)
	addUser(id, name, room) {
		const user = { id, name, room };
		this.users.push(user);
		return user;
	}

	// Remove User (id)
	removeUser(id) {
		const removedUser = this.users.find(user => user.id === id);
		this.users = this.users.filter(user => user.id !== id);
		return removedUser;
	}

	// Get User (id)
	getUser(id) {
		return this.users.find(user => user.id === id);
	}

	// Get User list (room)
	getUserList(room) {
		return this.users.filter(user => user.room === room);
	}
}

module.exports = Users;

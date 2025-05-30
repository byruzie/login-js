const UserModel = require("../models/userModel");
class UserController {
    searchUsers() {
        return UserModel.listUsers();
    }
    createUser(newUser) {
        return UserModel.createUser(newUser);
    }
}

module.exports = new UserController();
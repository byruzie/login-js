const UserModel = require("../models/userModel");

class UserController {
  searchUsers() {
    return UserModel.listUsers();
  }

  createUser(newUser) {
    return UserModel.createUser(newUser);
  }

  verifyLogin(email, password) {
    return UserModel.verifyCredentials(email, password);
  }
}

module.exports = new UserController();


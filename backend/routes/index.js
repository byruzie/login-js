const routerUsers = require("./users");
module.exports = (app) => {
    app.use(routerUsers);
}
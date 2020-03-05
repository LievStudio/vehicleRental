const express = require('express');
const routers = require('./routers/index')

module.exports = class Server {

    constructor (port, routers) {
        this.port = port;
        this.routers = routers;
        this.app = express();
    }
    init () {
        this.initApp();
        this.initRoutes();
    }

    initRouters() {
        this.routers.forEach((router) => {
            this.app.use(router.rootRoute, router.buildRouter());
        })

    }

    initApp() {
        this.app.listen(() => {
            console.log(`App is running on port: ${this.port}`);
        })
    }
}
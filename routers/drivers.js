const express = require('express');
const Controller = require('../controllers/controllers');
const bodymen = require('bodymen');
const Driver = require('../models/drivers');
const { age, firstName, lastName, driverLicense } = Driver;


module.exports = class DriverRouter {
    constructor () {
        this.rootRoute = '/drivers';
        this.byIdRoute= '/drivers?filter='
        this.router = express.Router();
        this.controller = new Controller();
    }

    buildRouter () {
        // GET all drivers
        this.router.get(this.rootRoute, async (req, res) => {
            try {
                let drivers = await this.controller.getAll();
                res.json({
                    data: {
                        drivers
                    }
                })
            } catch (err) {
                res.status(400);
                res.json({
                    data: {
                        message: err.message
                    }
                });
            }
        });
        
        //GET driver by Id
        this.router.get(`${this.rootRoute}/:id`, async (req, res) => {
            try {
               let driverById = getDriverById(req.params.id)
               res.json({
                   data: {
                       driverById
                   }
               });
            } catch (err) {
                res.status(400);
                res.json({
                    data: {
                        message: err.message
                    }
                })
            }
        })

        // GET drivers by criteria
        this.router.get(`${this.rootRoute}?filter=`, async (req, res) => {
            try {
                let drivers = await this.controller.getBy(req.params);
                res.json({
                    data: {
                        drivers
                    }
                })
            } catch (err) {
                res.status(400);
                res.json({
                    data: {
                        message: err.message
                    }
                });
            }
        })

        //POST a new driver
        this.router.post(this.rootRoute, bodymen.middleware({age, firstName, lastName, driverLicense}), async (req, res) => {
            try {
                let newDriver = await this.controller.post(req.bodymen.body);
                res.json({
                    data: {
                        newDriver
                    }
                })
            } catch (err) {
                res.status(400);
                res.json({
                    data: {
                        message: err.message
                    }
                });
            }
        })

        //PUT an existing driver
        router.put(`${this.rootRoute}/:id`, async(req, res) => {
            try {
                await updateDriver(req.params.id, req.body)
                res.json({ message: 'document was updated' });
            } catch (err) {
                res.status(500).json({message: err.message });
            }
        });  

        return this.router;
    }
}

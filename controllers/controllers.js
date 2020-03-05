const mongoose = require('mongoose');
const Driver = require('../models/drivers');

module.exports = class Controllers {
    getAll() {
        const drivers = Driver.find();
        return drivers;
    }

    getBy(reqParams) {

    }

    post(reqBody) {
        const driver = new Driver({
            age: reqBody.age,
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            driverLicense: reqBody.driverLicense
        })
        try {
            const newDriver = driver.save();
            res.status(201).json(newDriver);
            return newDriver;
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    updateDriver(driverId, reqBody) {
        try {
             Driver.findByIdAndUpdate({ _id: driverId }, reqBody, {
                new: true
            })
            res.json({ message: 'document was updated' });
        } catch (err) {
            res.status(500).json({message: err.message });
        } 
    }
}
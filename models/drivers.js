const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    vehiclesAvailable: {
        type: Number,
        required: true
    }
})

const driverSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    driverLicense: {
        type: String,
        required: true
    },
    vehicle: {
        type: vehicleSchema
    }
})

module.exports = mongoose.model('Driver', driverSchema);
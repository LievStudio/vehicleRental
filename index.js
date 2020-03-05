const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
// const routers = require('./routers/index');
// const Server = require('./server');

// const server = new Server(PORT, routers)

// server.init();

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
                    { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', error => console.error('An error occurred:', error));
db.once('open', () => console.log('Database connection successful'));

app.use(express.json()) ;

const driverRouter = require('./routers/drivers');
app.use('/drivers', driverRouter);

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));
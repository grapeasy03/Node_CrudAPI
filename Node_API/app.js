const express = require('express');
const mongoose = require('mongoose');
const sB = require('./seedDB');
const porterRouter = require('./routers/aliens');

const app = express();
const url = 'mongodb://localhost/Hporter';


mongoose.connect(url, { useNewUrlParser: true });

const conn = mongoose.connection;

conn.once('open', async () => {
    console.log('Connected .');
    try {
        await sB();
        console.log('Data added');
    } catch (error) {
        console.error('Error', error);
    }
    app.use(express.json());
    app.use('/porters', porterRouter);
    app.listen(9000, () => {
        console.log('Server  running on port 9000');
    });
});
conn.on('error', (error) => {
    console.error('Mongo connection error:', error);
});

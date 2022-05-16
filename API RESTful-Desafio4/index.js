
const path = require('path');
const express = require('express');
const apiRoutes = require('./routers/index');

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares

app.use(express.static('public'));

//Routes

app.use('/api', apiRoutes);




const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});
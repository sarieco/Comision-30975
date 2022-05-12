const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const { Productos } = require('./Productos');
const productos = new Productos('productos.txt');

app.get('/productos', (req, res) =>  {
    productos.getAll()
    .then(response => res.send(response))
    .catch(error => res.send(error.message))
    
});

app.get('/productoRandom', (req, res) =>  {
    productos.getRandom()
    .then(response => res.send(response))
    .catch(error => res.send(error.message))

});

const connectedServer = app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});
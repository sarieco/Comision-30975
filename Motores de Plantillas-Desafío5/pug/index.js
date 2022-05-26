const express = require('express');
const path = require('path');
const products = require(`./models/productsApi`);

const app = express();
const PORT = process.env.PORT || 8082;

const incomplete = [false];

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines
app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

app.get(`/`, (req, res) => {
    res.render(`index`, { form: true, incomplete: incomplete[0] });
})
app.get(`/productos`, (req, res) => {
    const search = products.searchProduct(req.query);
    let notFound = false;
    if (search.length === 0) notFound = true;
    res.render(`index`, { history: true, products: products.getAll(), search, notFound });
})
app.post(`/productos`, (req, res) => {
    products.preSave(res, req.body, incomplete);
})

const connectedServer = app.listen(PORT, () => console.log(`Servidor activo y escuchando en el puerto ${PORT}`));
connectedServer.on('error', (error) => console.log(error.message));
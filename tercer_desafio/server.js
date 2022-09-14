const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;
const Container = require('./container.js')

const products = new Container('./products.txt');


app.get('/randomProduct', async (req, res) => {
    const result = await products.getRandomProduct()
    res.json(result);
})

app.get('/products', async (req, res) => {
    const result = await products.getAll()
    res.json(result);
})

app.get('/', (req, res) => {
    res.send("/products : para ver todos los productos y /randomProduct : para ver uno")
})


app.listen(PORT, () => {
    console.log("El servidor está escuchando en el puerto 8080");
})
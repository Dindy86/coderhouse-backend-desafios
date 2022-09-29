const express = require('express');
const { Router } = express;
const app = express();
const routerForm = Router();
const {getFormProduct} = require('../controllers/products_controllers');

routerForm.get('/', getFormProduct);

module.exports = routerForm;
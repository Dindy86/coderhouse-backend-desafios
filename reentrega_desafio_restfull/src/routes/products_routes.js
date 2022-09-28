const express = require('express');
const { Router } = express;
const app = express();
const router = Router();
const {getAllProducts, deleteProductById, updateProduct, saveProduct, getProductById } = require('../controllers/products_controllers');


router.get('/', getAllProducts);
router.get('/:id', getProductById );
router.post('/', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProductById)

module.exports = router;
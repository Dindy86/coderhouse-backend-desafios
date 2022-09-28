
const ProductsContainer = require('../class/products_container');
const product = new ProductsContainer([]);

const getAllProducts = (req, res) => {
    res.status(200).json(product.getAll());
}

const getProductById = (req, res) => {
    const {id} = req.params;
    if (!isNaN(id) ) {
        return res.status(200).json(product.getById(parseInt(id)));
    } 
    return res.status(400).json({error: 'error al pasar el parametro'}); 
}

const saveProduct = (req, res) => {
    const {title, price, thumbnail} = req.body;
    if (title && price && thumbnail) {
        return res.status(200).json(product.save({title, price, thumbnail}));    
    } 
    return res.status(400).json({error: 'error al pasar parametros'});
}

const updateProduct = (req, res) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    if (title && price && thumbnail && !isNaN(id)) {
        return res.status(200).json(product.update(parseInt(id), title, price, thumbnail)); 
    } 
    return res.status(400).json({error: 'error al modificar los datos'});
}

const deleteProductById = (req, res) => {
    const {id} = req.params;
    if (!isNaN(id)) {
        return res.status(200).json(product.deleteById(parseInt(id)));
    }
    return res.status(400).json({error: 'error al pasar el parametro'});
}

module.exports = {getAllProducts, deleteProductById, updateProduct, saveProduct, getProductById }
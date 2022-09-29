const ProductsContainer = require('../class/products_container');
const product = new ProductsContainer([]);

const getFormProduct = (req, res) => {
    res.status(200).render('./form_template');
}

const getAllProducts = (req, res) => {
    const prod = product.getAll(); 
    res.status(200).render('./view_products_template', {prod});
}

const saveProduct = (req, res) => {
    const {title, price, thumbnail} = req.body;
    if (title && price && thumbnail) {
        product.save({title, price, thumbnail});
        return res.status(200).redirect('/');
    } 
    return res.status(400).json({error: 'error al pasar parametros'});
}


const getProductById = (req, res) => {
    const {id} = req.params;
    if (!isNaN(id) ) {
        return res.status(200).json(product.getById(parseInt(id)));
    } 
    return res.status(400).json({error: 'error al pasar el parametro'}); 
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

module.exports = {getFormProduct, getAllProducts, deleteProductById, updateProduct, saveProduct, getProductById }
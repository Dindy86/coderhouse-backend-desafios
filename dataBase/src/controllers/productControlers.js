const {option} = require('../conectionConfig/config');
const knexMsql = require('knex')(option.mysql);
const ProductsContainer = require('../containers/productsContainer');
const productContainer = new  ProductsContainer(knexMsql, 'product');

const getRenderProduct = async (req, res) => {
    try {
        res.render( 'index' , { prod: await productContainer.getAllProducts()});
    } catch (err) {
        console.log(err);
    }
}

module.exports = getRenderProduct;
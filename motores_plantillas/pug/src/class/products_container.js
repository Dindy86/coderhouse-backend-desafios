class ProductsContainer {

    constructor( products = [] ) {
        this.products = products;
    }

    save( obj ) {
        let id = 1;
        let newProduct = null;
        if(this.products.length > 0 ) {
           id += this.products[this.products.length - 1].id; 
           newProduct = {...obj, id}
           this.products.push(newProduct);
           return newProduct;
        }
        newProduct = {...obj, id}
        this.products.push(newProduct);
        return newProduct;
    }

    getById(idProduct) {      
        const product = this.products.find(prod => prod.id === idProduct);
        if (!product) {
            return {error: 'Producto no encontrado.'}
        }     
        return product;    
    }

    update(idProduct, title, price, thumbnail) {
        const product = this.products.find(prod => prod.id === idProduct);
        if (!product) {
            return {error: 'Producto no encontrado.'}
        }   
        product.title = title;
        product.price = price; 
        product.thumbnail = thumbnail;
        return {mensaje: "Producto actualizado"};
    }

    getAll() {
        if (this.products.length === 0) {
            return [];
        } 
        return this.products;
    }

    deleteById(idProduct) {
        const newContents = this.products.filter(prod => prod.id !== idProduct);
        if(newContents.length === this.products.length) {
            return {mensaje: "Este producto no existe"};
        }  
        this.products = [...newContents];
        return {mensaje: "Producto eliminado"};
    }

}

module.exports = ProductsContainer;

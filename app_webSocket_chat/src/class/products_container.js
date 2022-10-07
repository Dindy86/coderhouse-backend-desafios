const fs = require('fs');

class ProductsContainer {
    constructor(file) {
        this.file = file;
        try {
            this.products = fs.readFileSync(file, 'utf-8')
            this.products = JSON.parse(this.products)
        } catch (error) {
            this.products = [];
        }
    }

    getAllProducts () {
        return this.products;
    }

    save( obj ) {
        let id = 1;
        let newProduct = null;
        if(this.products.length > 0 ) {
           id += this.products[this.products.length - 1].id; 
           newProduct = {...obj, id}
           this.products.push(newProduct);
           fs.writeFileSync(this.file, JSON.stringify(this.products));
           return
        }
        newProduct = {...obj, id}
        this.products.push(newProduct);
        fs.writeFileSync(this.file, JSON.stringify(this.products))
    }
}

module.exports = ProductsContainer;

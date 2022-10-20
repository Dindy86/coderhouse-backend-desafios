
class ProductsContainer {
    constructor (knexConnection, table) {
        this.knex = knexConnection;
        this.table = table;
    }

    async getAllProducts() {
        try {
            return await this.knex(this.table).select('*');
        } catch (err) {
            console.log(err);
        }
    }

    async save( obj ) {
        try {
            return await this.knex(this.table).insert(obj);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ProductsContainer;


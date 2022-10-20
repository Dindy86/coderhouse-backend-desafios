const {option} = require('../conectionConfig/config');
const mysqlKnex = require('knex')(option.mysql);
const sqliteKnex = require('knex')(option.sqlite);


mysqlKnex.schema.dropTableIfExists('product')
	.finally(() => {
		mysqlKnex.schema.createTable('product', table => {
			table.increments('id')
			table.string("title")
			table.integer("price")
			table.string("thumbnail");
		})
			.then(() => console.log('Tabla de mysql creada'))
			.catch((err) => { console.log(err); throw err })
			.finally(() => { mysqlKnex.destroy() })
	})

sqliteKnex.schema.dropTableIfExists('message')
	.finally(() => {
		sqliteKnex.schema.createTable('message', table => {
			table.increments('id')
			table.string("user")
			table.string("date")
			table.string("message");
		})
			.then(() => console.log('Tabla de sqlite creada'))
			.catch((err) => { console.log(err); throw err })
			.finally(() => { sqliteKnex.destroy() })
	})

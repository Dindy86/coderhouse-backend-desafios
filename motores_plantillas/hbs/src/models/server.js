const express = require('express');
const app = express();
const router = require('../routes/products_routes');
const routerForm = require('../routes/form_route');
const hbs = require('express-handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir:'../views/partials',
    layoutsDir: '../views/layouts',
    defaultLayout:'layout.hbs' 
}))

app.set('views', '../views');
app.set('view engine', 'hbs');

app.use('/products',router);
app.use('/',routerForm);

const PORT = 8080;
const conectServer = app.listen(PORT, (error)=> {
    if(error) console.log(error);
    console.log(`El servidor está escuchando en el puerto ${conectServer.address().port}`);
})
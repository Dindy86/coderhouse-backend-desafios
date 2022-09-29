const express = require('express');
const app = express();
const router = require('../routes/products_routes');
const routerForm = require('../routes/form_route');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views', '../views');
app.set('view engine', 'ejs');
app.use('/products',router);
app.use('/',routerForm);




const PORT = 8080;
const conectServer = app.listen(PORT, (error)=> {
    if(error) console.log(error);
    console.log(`El servidor está escuchando en el puerto ${conectServer.address().port}`);
})
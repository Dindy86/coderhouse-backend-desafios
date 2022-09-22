const express = require('express');
const { Router } = express;
const app = express();
const router = Router();
const Container = require('./container');

const prod = new Container([]);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.status(200).json(prod.getAll());
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    if (!isNaN(id) ) {
        return res.status(200).json(prod.getById(parseInt(id)));
    } 
    return res.status(400).json({error: 'error al pasar el parametro'}); 
})

router.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body;
    if (title && price && thumbnail) {
        return res.status(200).json(prod.save({title, price, thumbnail}));    
    } 
    return res.status(400).json({error: 'error al pasar parametros'});
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    if (title && price && thumbnail && !isNaN(id)) {
        return res.status(200).json(prod.update(parseInt(id), title, price, thumbnail)); 
    } 
    return res.status(400).json({error: 'error al modificar los datos'});
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (!isNaN(id)) {
        return res.status(200).json(prod.deleteById(parseInt(id)));
    }
    return res.status(400).json({error: 'error al pasar el parametro'});
})


app.use(express.static(__dirname + '/public'));
app.use('/api/products',router);


const conectServer = app.listen(PORT, (error)=> {
    if(error) console.log(error);
    console.log(`El servidor está escuchando en el puerto ${conectServer.address().port}`);
})
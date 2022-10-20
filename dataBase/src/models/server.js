const router = require('../routes/productRoute');
const express = require('express');
const app = express();
const {Server: HttpSerer} = require('http');
const {Server: IOServer} = require('socket.io');

const httpSerer = new HttpSerer(app);
const io = new IOServer(httpSerer);

const {option} = require('../conectionConfig/config');
const sqliteKnex = require('knex')(option.sqlite);
const mysqlKnex = require('knex')(option.mysql);
const MessagesContainer = require('../containers/messagesContainer');
const ProductsContainer = require('../containers/productsContainer');

const messages = new MessagesContainer(sqliteKnex, 'message');
const productContainer = new  ProductsContainer(mysqlKnex, 'product');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../../public'));


app.set('views','../../public/views/pages') 
app.set('view engine', 'ejs')

app.use('/', router);


const PORT = 8080;
const conectServer = httpSerer.listen(PORT, (error)=> {
    if(error) console.log(error);
    console.log(`El servidor está escuchando en el puerto ${conectServer.address().port}`);
})

io.on('connection', async (client) => {
    console.log('estoy escuchando desde Socket');
    client.on('disconnect', ()=> {
        console.log("Usuario desconectado");
    })

    const productsData = await productContainer.getAllProducts();
    client.emit('productsMessage', productsData);

    client.on('newProduct', (product)=>{
        const newProducts = productContainer.save(product)
        io.sockets.emit('productsMessage', newProducts);
    })
    
    const result = await messages.getAllMessages();
    client.emit('allMessagesUsers', result);

    client.on('newMessageUser', (messageUser) => {
       const allMessages = messages.save(messageUser)
       io.sockets.emit('allMessagesUsers', allMessages)
    })
    
})

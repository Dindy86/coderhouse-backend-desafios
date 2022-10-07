const  ProductsContainer = require('../class/products_container');
const productContainer = new ProductsContainer('../productsFile/products.json');
const  MessagesContainer = require('../class/messages_container');
const messagesContainer = new MessagesContainer('../messagesFile/messages.json');

const express = require('express');
const app = express();
const {Server: HttpSerer} = require('http');
const {Server: IOServer} = require('socket.io');

const httpSerer = new HttpSerer(app);
const io = new IOServer(httpSerer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../../public'));

const getAllProducts = productContainer.getAllProducts();
const getAllMessages = messagesContainer.getAllMessages();

app.set('views','../../public/views/pages') 
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render( 'index' , { prod: getAllProducts})
})


const PORT = 8080;
const conectServer = httpSerer.listen(PORT, (error)=> {
    if(error) console.log(error);
    console.log(`El servidor está escuchando en el puerto ${conectServer.address().port}`);
})

io.on('connection', (client)=> {
    console.log('estoy escuchando desde Socket');
    client.on('disconnect', ()=> {
        console.log("Usuario desconectado");
    })

    client.emit('productsMessage', JSON.stringify(getAllProducts));
    client.on('newProduct', (product)=>{
        const newProducts = productContainer.save(product)
        io.sockets.emit('productsMessage', JSON.stringify(newProducts));
    })

    client.emit('allMessagesUsers', JSON.stringify(getAllMessages))
    client.on('newMessageUser', (messageUser) => {
       const allMessages = messagesContainer.save(messageUser)
       io.sockets.emit('allMessagesUsers', allMessages)
    })
})


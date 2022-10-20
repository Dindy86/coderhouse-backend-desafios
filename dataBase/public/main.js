
const socket = io.connect();

/**************************** PRODUCT ************************* */
socket.on('productsMessage', (products)=> {
    renderProducts(products);
})

const renderProducts = (products) => {
    const arrayProd = products;
    const html = arrayProd.map((element) => {
           return (`<tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.price}</td>
                    <td><img src='${element.thumbnail}' width="50" height="50"></td>
                </tr>`)
    })

    document.getElementById("mostrarProductos").innerHTML = html
}

const saveProduct = () => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    if (title !== "" || price !== "" || thumbnail !== "" ) {
        socket.emit('newProduct', { title, price, thumbnail})
    } else {
        alert('LLenar bien el formulario');
    }
    return false
}


/********************************** MESSAGE ****************************** */

socket.on('allMessagesUsers', (data) => {
    renderMessageUser(data)
})

const saveMessageUser = () => {
    const user = document.getElementById('user').value
    const message = document.getElementById('text').value
    const actualDate = new Date()
    const date = actualDate.toLocaleString('en-GB')
    if (user !== "" ||message !== "" ) {
        socket.emit('newMessageUser', { user, message, date })
    } else {
        alert('LLenar bien el formulario de mensaje');
    }
    return false
}

const renderMessageUser = (data) => {
    const messages = data;
    const html = messages.map((msg) => {
        return (`<div class="d-block mx-auto my-1 p-1">
                    <strong class="fw-bold text-primary">${msg.user}</strong>:
                    <e id="colorBrown" style="color:brown;">${msg.date} </e>: 
                    <em id="colorGreen" style="color:MediumSeaGreen;">${msg.message}</em>
                 </div>`)
    }).join(" ")

    document.getElementById('container_messages').innerHTML = html
}


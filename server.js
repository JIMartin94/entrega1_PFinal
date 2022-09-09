const express = require('express')
const {routerProductos} = require("./routers/productos.js")
const {routerCarrito} = require("./routers/carrito.js")

const app = express();
app.use(express.json())



app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarrito)


const server = app.listen(8080,() =>{
    console.log(`conectado al puerto ${server.address().port}`)
})
const express = require('express');
const { obtenerProducto } = require('../logica/logicaProductos');
const {agregarCarrito,obtenerCarrito,obtenerCarritos,eliminarcarrito,agregarProductoACart,eliminarProdDelCart} = require('../logica/logicaCarrito')

const routerCarrito = express.Router()



routerCarrito.get('/',(req,res)=>{
    obtenerCarritos().then(data =>{
        res.json({productos: data});
    }).catch(e =>{
        console.log(e)
    })
})

routerCarrito.post('/', (req,res)=>{
    const dia = new Date().toLocaleString()
    carrito = {id_carrito:Date.now(),date: dia, productos: []}
    agregarCarrito(carrito).then(data =>{
        res.send(data);
    }).catch(e =>{
        console.log(e)
    })
})

routerCarrito.delete('/:id', (req,res)=>{
    let id = Number(req.params.id)
        
    eliminarcarrito(id).then(data =>{
        res.send(data);
    }).catch(e =>{
        console.log(e)
    })
    
})

routerCarrito.get('/:idCarrito/productos', (req,res) => {
    let idCart = req.params.idCarrito;
    let prods = carrito.find(c => c.id = idCart)
    res.json({productos: prods.productos})
})


routerCarrito.post('/:idCarrito/productos', (req,res)=>{
    let idCarrito = Number(req.params.idCarrito)
    let idProd = Number(req.body.id)
    
    agregarProductoACart(idProd,idCarrito).then(data =>{
        res.send(data);
    }).catch(e =>{
        console.log(e)
    })   
});

routerCarrito.delete('/:idCarrito/productos/:id_prod', (req,res)=>{
    let idCarrito = Number(req.params.idCarrito)
    let idp = Number(req.params.id_prod)

    eliminarProdDelCart(idp,idCarrito).then(data =>{
        res.send(data);
    }).catch(e =>{
        console.log(e)
    }) 
})


routerCarrito.get('/:idCarrito',(req,res)=>{
    let cartId = req.params.idCarrito;

    obtenerCarrito(cartId).then(data =>{
        res.json({producto: data});
    }).catch(e =>{
        console.log(e)
    })
})


exports.routerCarrito = routerCarrito;
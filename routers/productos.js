const express = require('express')
const { agregarProducto,obtenerProductos, obtenerProducto, actualizarProducto,eliminarProducto } = require('../logica/logicaProductos')
const {soloAdmins} = require('../middlewares/middlewares')


const routerProductos = express.Router()

routerProductos.get('/:id?',(req,res)=>{
    let id = Number(req.params.id);
    if(!id){
        obtenerProductos().then(data =>{
            res.json({productos: data});
        }).catch(e =>{
            console.log(e)
        })
        
    }else{
        obtenerProducto(id).then(data =>{
            res.json({productos: data});
        }).catch(e =>{
            console.log(e)
        })
    }
});

routerProductos.post('/', soloAdmins ,(req,res)=>{
    let datosProducto = req.body
    let date = new Date().toLocaleString()
    datosProducto = {...datosProducto,date}
    if (!datosProducto.title){
        return res.status(400).json({ msg: 'El campo titulo es obligatorio'})
    }if (!datosProducto.desc){
        return res.status(400).json({ msg: 'El campo descripcion es obligatorio'})
    }
    if (!datosProducto.price){
        return res.status(400).json({ msg: 'El campo precio es obligatorio'})
    }
    if (!datosProducto.urlFoto ){
        return res.status(400).json({ msg: 'El campo foto es obligatorio'})
    }
    if (!datosProducto.code){
        return res.status(400).json({ msg: 'El campo code es obligatorio'})
    }
    if (!datosProducto.stock){
        return res.status(400).json({ msg: 'El campo stock es obligatorio'})
    }

    agregarProducto(datosProducto);
    
    return res.status(201).json({msg: `Se agrego el producto correctamente`})
})


routerProductos.put('/:id', soloAdmins , (req,res)=>{
    let id = Number(req.params.id)
    let datosProducto = req.body
    if (!datosProducto.title){
        return res.status(400).json({ msg: 'El campo titulo es obligatorio'})
    }if (!datosProducto.desc){
        return res.status(400).json({ msg: 'El campo descripcion es obligatorio'})
    }
    if (!datosProducto.price){
        return res.status(400).json({ msg: 'El campo precio es obligatorio'})
    }
    if (!datosProducto.urlFoto ){
        return res.status(400).json({ msg: 'El campo foto es obligatorio'})
    }
    if (!datosProducto.code){
        return res.status(400).json({ msg: 'El campo code es obligatorio'})
    }
    if (!datosProducto.stock){
        return res.status(400).json({ msg: 'El campo stock es obligatorio'})
    }

    actualizarProducto(id,datosProducto).then(data =>{
        res.send(data);
    }).catch(e =>{
        console.log(e)
    })
});

routerProductos.delete('/:id', soloAdmins , (req,res)=>{
    let id = Number(req.params.id)
    
    eliminarProducto(id).then(data =>{
        res.send(data);
    }).catch(e =>{
        console.log(e)
    })
})

exports.routerProductos = routerProductos
const {promises:fs} = require("fs");

const archivo = './productos.json'

const agregarProducto = async (producto)=>{
    let objs = await obtenerProductos()
    let prod = {id_prod: Date.now(),...producto}
    
    let productos = [...objs,prod]; 
    
    try {
        await fs.writeFile(archivo,JSON.stringify(productos,null,2))
        return `El producto ${producto.id} se agrego exitosamente`
    } catch (error) {
        throw new Error(`Error al guardar los datos ${error}`);
    }
}

const obtenerProducto = async (idProducto)=>{
    let productos = await obtenerProductos()
    let prod = productos.find(p => p.id_prod = idProducto);
    
    if(prod.length != 0){
        return prod;
    }else{
        return `El producto con Id: ${idProducto} no fue encontrado`
    }
}

const obtenerProductos = async () =>{
    try{
        let objs = await fs.readFile(archivo);

        return JSON.parse(objs);
    }catch(error){
        return 'No se pudieron obtener los productos';
    }
}

const actualizarProducto = async(id,producto) =>{
    let find = false;
    let productos = await obtenerProductos()
    
    console.log(productos)
    productos.forEach(p=>{
        if(p.id_prod == id){
            p.title = producto.title;
            p.price = producto.price;
            p.desc = producto.desc;
            p.code = producto.code;
            p.stock = producto.stock;
            p.urlFoto = producto.urlFoto;
            find = true
        }
    })

    
    if(!find){
        
        return `El producto con id: ${id} no existe`
    }
    await fs.writeFile(archivo,JSON.stringify(productos,null,2));
    return `El producto ${producto.title} se modifico con exito`
}

const eliminarProducto = async(id) =>{

    let productos = await obtenerProductos()
    let prodIndex = productos.findIndex(p=> p.id_prod == id);
    productos.splice(prodIndex,1)
    await fs.writeFile(archivo,JSON.stringify(productos,null,2));
    return `Se borro el producto`
}


module.exports = {agregarProducto,obtenerProducto,obtenerProductos,actualizarProducto,eliminarProducto} 
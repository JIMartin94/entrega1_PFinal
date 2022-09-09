const {promises:fs} = require("fs");
const { obtenerProducto, obtenerProductos } = require('./logicaProductos');

const archivo = './carrito.json'


const obtenerCarritos = async () =>{
    try{
        let objs = await fs.readFile(archivo);

        return JSON.parse(objs);
    }catch(error){
        return 'No se pudieron obtener los carritos';
    }
}


const obtenerCarrito = async (id)=>{
    let carritos = await obtenerCarritos()
    let cart = carritos.find(p => p.id = id);
    
    if(cart.length != 0){
        return cart;
    }else{
        return `El producto con Id: ${id} no fue encontrado`
    }
}


const agregarCarrito = async (carrito)=>{
    let objs = await obtenerCarritos()
    
    let carritos = [...objs,carrito]; 
    try {
        await fs.writeFile(archivo,JSON.stringify(carritos,null,2))
        return `El producto ${carrito.id} se agrego exitosamente`
    } catch (error) {
        throw new Error(`Error al guardar los datos ${error}`);
    }
}

const agregarProductoACart = async (idProd,idCart) =>{
    let carritos = await obtenerCarritos();

    let cart = carritos.findIndex( c => c.id == idCart)
    if(cart== -1){
        return `El carrito con id ${idCart} no existe`
    } 
    try {
        obtenerProducto(idProd).then(data=>{
            carritos[cart].productos.push(data)
            console.log(carritos)
            fs.writeFile(archivo,JSON.stringify(carritos,null,2))         
        })
        return `El producto ${idProd} se agrego exitosamente`
    } catch (error) {
        throw new Error(`Error al guardar los datos ${error}`);
    }
}


const eliminarcarrito = async(id) =>{

    let carritos = await obtenerCarritos()
    let cartIndex = carritos.findIndex(c=> c.id == id);
    carritos.splice(cartIndex,1)
    await fs.writeFile(archivo,JSON.stringify(carritos,null,2));
    return `Se borro el carrito con id: ${id}`;
}

const eliminarProdDelCart = async(idProd,idCart)=>{
    let carritos = await obtenerCarritos()
    let cart = carritos.find(c => c.id == idCart);
    let prodIndex = cart.productos.findIndex(p=> p.id_prod == idProd);
    cart.productos.splice(prodIndex,1)

    try {
        await fs.writeFile(archivo,JSON.stringify(carritos,null,2))         
        
        return `El producto con id:${idProd} se borro exitosamente`
    } catch (error) {
        throw new Error(`Error al guardar los datos ${error}`);
    }
}   


module.exports = {agregarCarrito,obtenerCarrito,obtenerCarritos,eliminarcarrito,agregarProductoACart,eliminarProdDelCart} 
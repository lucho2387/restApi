const { productos } = require('../productos.json')

module.exports = {
    
    getProducts: (req, res) => {
        res.json({productos})
    },

    searchProduct:(req, res) => {
        const {id} = req.params

        if (id > productos.length) {
            res.status(500).json({error: "No se encontro el producto"})
            return
        }

        productos.map(producto => {
            if(producto.id === id){
                res.json(producto)
            }
        })
    },

    addProduct: (req, res) => {
        const {title,price,thumbnail} = req.body
        if(title && price && thumbnail){
            const id = productos.length + 1
            const nuevoProducto = {id, ...req.body}
            productos.push(nuevoProducto)
            res.json(productos)   
        }else {
            res.status(500).json({error: "No se pudieron guardar los datos."})  
        }
    },

    updateProduct: (req, res) => {
        const {id} = req.params
        const {title,price,thumbnail} = req.body
        
        if (id > productos.length) {
            res.status(500).json({error: "No se encontro el producto"})
            return
        }

        productos.map(producto => {
            if(producto.id === id){
                if(title && price && thumbnail){
                    producto.title = title;
                    producto.price = price;
                    producto.thumbnail = thumbnail;
                    res.json(productos)
                }else {
                    res.status(500).json({error: "Faltaron campos para completar"})
                    return
                }
            }
        })
    },

    deleteProduct: (req, res) => {
        const { id } = req.params
    
        if (id > productos.length) {
            res.status(500).json({error: "No se encontro el producto"})
            return
        }
        productos.map((producto, i) => {
            if(producto.id ==  Number(id)){
                productos.splice(i, 1)
            }
        })
        res.json(productos)
    }
}
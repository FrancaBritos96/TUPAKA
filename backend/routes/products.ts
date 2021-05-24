import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';
import usuarios from '../controllers/usuario'
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';


const productRoutes = Router();


productRoutes.get('/getProductById', verificarToken, async (req: any, res: Response) => {

    let productId = req.body.id_producto

    let product = await query("Select * from productos where id_producto = ?", [productId]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    })
})


productRoutes.get('/getAllProducts', verificarToken, async (req: any, res: Response) => {

    let users = await query("Select * from productos where id_estado = 1", []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los productos",
        data: users
    })
})



productRoutes.post('/createProduct', async (req: any, res: Response) => {
    try {
        const body = req.body;
        const id_categoria = body.id_categoria;
        const id_estado = body.id_estado;
        const id_tamaño = body.id_tamaño;
        const nombre = body.nombre;
        const descripcion = body.descripcion;
        const precio = body.precio;
        const stock = body.stock;
        // imagen??


        let queryTransaction = "START TRANSACTION"
        let queryProduct = "INSERT INTO PRODUCTOS (id_categoria, id_estado, id_tamaño, nombre, descripcion, precio, stock)  VALUES(?,?,?,?,?,?,?)";

        await query(queryTransaction, []);
        let insertProduct: any = await query(queryProduct, [id_categoria, id_estado, id_tamaño, nombre, descripcion, precio, stock]);

        let commit = await query("commit", []);
        res.json({
            estado: "Success",
            mensaje: "Producto creado con exito",
            data: commit
        })
    }
    catch (error) {
        await query("rollback", []);
        res.json({
            estado: "error",
            mensaje: "No se pudo crear el producto",
            data: error
        });
    }
})

export default productRoutes;
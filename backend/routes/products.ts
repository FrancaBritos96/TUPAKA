import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';
import usuarios from '../controllers/usuario'
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import FileSystem from '../clases/file-system';
import { IfileUpload } from '../interfaces/file-upload';

const fileSystem = new FileSystem();
const productRoutes = Router();


productRoutes.get('/getProductById', verificarToken, async (req: any, res: Response) => { //Agregar el middleware del token cuando este hecho el login

    let productId = req.body.id_producto

    let product = await query("Select * from productos where id_producto = ?", [productId]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    })
})


productRoutes.get('/getAllProducts', verificarToken, async (req: any, res: Response) => {

    let products = await query("Select * from productos where id_estado = 1", []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los productos",
        data: products
    })
})



productRoutes.post('/createProduct', verificarToken, async (req: any, res: Response) => {
    try {
        const body = req.body;
        const id_categoria = body.id_categoria;
        const id_estado = body.id_estado;
        const id_tamaño = body.id_tamaño;
        const nombre = body.nombre;
        const descripcion = body.descripcion;
        const precio = body.precio;
        const stock = body.stock;


        let queryTransaction = "START TRANSACTION"
        let queryProduct = "INSERT INTO PRODUCTOS (id_categoria, id_estado, id_tamaño, nombre, descripcion, precio, stock)  VALUES(?,?,?,?,?,?,?)";

        await query(queryTransaction, []);
        let insertProduct: any = await query(queryProduct, [id_categoria, id_estado, id_tamaño, nombre, descripcion, precio, stock]);

        await query("commit", []);
        res.json({
            estado: "Success",
            mensaje: "Producto creado con exito",
            data: insertProduct
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

productRoutes.post("/upload/:productId", verificarToken, async (req: any, res: Response) => {

    const { productId } = req.params;
    const imag: IfileUpload = req.files.image;
    

    if (!req.files) {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'No se subió el archivo'
        })
    }

    const validacionTipoImagen = imag.mimetype.includes('image');

    if (!validacionTipoImagen) {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'Formato incorrecto'
        })
    }

    await fileSystem.guardarImagenTemporal(productId, imag);

    const imagenes: Array<string> = fileSystem.imagenesDeTempHaciaPost(productId);
    let imagesProduct = "INSERT INTO IMAGENES (id_producto, nombre)  VALUES(?,?)";

    imagenes.forEach(async item => {
        await query(imagesProduct, [productId, item]);
    })

    res.json({
        estado: 'success',
        data: imag
    })
})

productRoutes.get('/imagen/:productId/:img', (req: any, res: Response) => {

    const productId = req.params.productId;
    const img = req.params.img;


    const foto = fileSystem.getFotoUrl(productId, img);

    res.sendFile(foto);
})


export default productRoutes;
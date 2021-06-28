import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import FileSystem from '../clases/file-system';
import { IfileUpload } from '../interfaces/file-upload';

const fileSystem = new FileSystem();
const productRoutes = Router();


//OBTENER PRODUCTO POR ID
productRoutes.get('/getProductById', verificarToken, async (req: any, res: Response) => { //Agregar el middleware del token cuando este hecho el login

    let productId = req.body.id_producto

    let product = await query("Select * from productos where id_producto = ?", [productId]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    })
})

//OBTENER PRODUCTO POR ESTADO
productRoutes.get('/getProductByStatus', verificarToken, async (req: any, res: Response) => { //Agregar el middleware del token cuando este hecho el login

    let id_estado = req.body.id_producto

    let product = await query("Select * from productos where id_estado = ?", [id_estado]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    })
})

//OBTENER PRODUCTO POR NOMBRE
productRoutes.get('/getProductByName', verificarToken, async (req: any, res: Response) => { //Agregar el middleware del token cuando este hecho el login

    let productName = req.body.nombre

    let product = await query(`Select * from productos where name LIKE '%${productName}%'`, []);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    })
})


//OBTENER TODOS LOS PRODUCTOS
productRoutes.get('/getAllProducts', verificarToken, async (req: any, res: Response) => {

    let products = await query("Select * from productos where id_estado = 1", []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los productos",
        data: products
    })
})


//CREAR PRODUCTO
productRoutes.post('/createProduct', verificarToken, async (req: any, res: Response) => {
    try {
        const body = req.body;
        const id_categoria = body.id_categoria;
        const id_estado = 1;
        const id_tamano = body.id_tamano;
        const nombre = body.nombre;
        const descripcion = body.descripcion;
        const precio = body.precio;
        const stock = body.stock;


        let queryTransaction = "START TRANSACTION"
        let queryProduct = "INSERT INTO PRODUCTOS (id_categoria, id_estado, id_tamano, nombre, descripcion, precio, stock)  VALUES(?,?,?,?,?,?,?)";

        await query(queryTransaction, []);
        let insertProduct: any = await query(queryProduct, [id_categoria, id_estado, id_tamano, nombre, descripcion, precio, stock]);

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


//SUBIR IMAGEN A PRODUCTO
productRoutes.post("/upload/:productId", verificarToken, async (req: any, res: Response) => {

    const { productId } = req.params;

    if (req.files) {
        let arrayNuevo = Object.values(req.files);
        console.log(arrayNuevo);

        arrayNuevo.forEach(async imagen => {
            let newImage: any = imagen;
            const imag: IfileUpload = newImage;

            const validacionTipoImagen = imag.mimetype.includes('image');

            if (!validacionTipoImagen) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'Formato incorrecto'
                })
            }
            await fileSystem.guardarImagenTemporal(productId, imag);
        });


        const imagenes: Array<string> = fileSystem.imagenesDeTempHaciaPost(productId);

        let imagesProduct = "INSERT INTO IMAGENES (id_producto, nombre, id_estado)  VALUES(?,?,?)";

        const id_estado = '1';

        imagenes.forEach(async item => {
            await query(imagesProduct, [productId, item, id_estado]);
        })

        res.json({
            estado: 'success',
            data: arrayNuevo
        })
    }
    else {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'No se subió el archivo'
        })
    }
})


//EDITAR IMAGEN
productRoutes.put('/editImageStatus/:id', verificarToken, async (req: any, res: Response) => {


    const datosToken = req.usuario;
    const { id } = req.params;

    const id_estado = req.body.id_estado;

    if (datosToken.idRol == '1') {

        await query(`UPDATE imagenes set id_estado= ${id_estado} WHERE id_imagen = ${id}`, []);
        let commit = await query("commit", []);

        res.json({
            estado: "success",
            mensaje: "Imagen editada con exito",
            data: commit
        })
    } else {
        res.json({
            estado: "Error",
            mensaje: "No tienes permisos de Administrador",
        })
    }
})

//OBTENER IMAGEN (FISICA PARA VISUALIZAR EN FRONT)
productRoutes.get('/imagen/:productId/:img', verificarToken, async (req: any, res: Response) => {

    const productId = req.params.productId;
    const img = req.params.img;

    const foto = fileSystem.getFotoUrl(productId, img);
    res.sendFile(foto);
    // const fotos = fileSystem.getFotosUrls(productId);
    // setTimeout(() => {
    //      res.sendFile(fotos);
    // }, 50);
})


//OBTENER IMAGEN (REGISTROS DE LA TABLA PARA OBTENER EL ID)

productRoutes.get('/getImagesByOrderId/:idProducto', verificarToken, async (req: any, res: Response) => {

    const { idProducto } = req.params;

    let products = await query("Select * from imagenes where id_estado = 1 and id_producto = ?", [idProducto]);
    res.json({
        estado: "success",
        mensaje: "Se encontraron las imagenes para el producto",
        data: products
    })
})

export default productRoutes;
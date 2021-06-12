"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const queryPromess_1 = __importDefault(require("./queryPromess"));
const file_system_1 = __importDefault(require("../clases/file-system"));
const fileSystem = new file_system_1.default();
const productRoutes = express_1.Router();
//OBTENER PRODUCTO POR ID
productRoutes.get('/getProductById', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productId = req.body.id_producto;
    let product = yield queryPromess_1.default("Select * from productos where id_producto = ?", [productId]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    });
}));
//OBTENER PRODUCTO POR ESTADO
productRoutes.get('/getProductByStatus', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id_estado = req.body.id_producto;
    let product = yield queryPromess_1.default("Select * from productos where id_estado = ?", [id_estado]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    });
}));
//OBTENER PRODUCTO POR NOMBRE
productRoutes.get('/getProductByName', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productName = req.body.nombre;
    let product = yield queryPromess_1.default(`Select * from productos where name LIKE '%${productName}%'`, []);
    res.json({
        estado: "success",
        mensaje: "Se encontró el producto",
        data: product
    });
}));
//OBTENER TODOS LOS PRODUCTOS
productRoutes.get('/getAllProducts', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield queryPromess_1.default("Select * from productos where id_estado = 1", []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los productos",
        data: products
    });
}));
//CREAR PRODUCTO
productRoutes.post('/createProduct', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id_categoria = body.id_categoria;
        const id_estado = body.id_estado;
        const id_tamaño = body.id_tamaño;
        const nombre = body.nombre;
        const descripcion = body.descripcion;
        const precio = body.precio;
        const stock = body.stock;
        let queryTransaction = "START TRANSACTION";
        let queryProduct = "INSERT INTO PRODUCTOS (id_categoria, id_estado, id_tamaño, nombre, descripcion, precio, stock)  VALUES(?,?,?,?,?,?,?)";
        yield queryPromess_1.default(queryTransaction, []);
        let insertProduct = yield queryPromess_1.default(queryProduct, [id_categoria, id_estado, id_tamaño, nombre, descripcion, precio, stock]);
        yield queryPromess_1.default("commit", []);
        res.json({
            estado: "Success",
            mensaje: "Producto creado con exito",
            data: insertProduct
        });
    }
    catch (error) {
        yield queryPromess_1.default("rollback", []);
        res.json({
            estado: "error",
            mensaje: "No se pudo crear el producto",
            data: error
        });
    }
}));
//SUBIR IMAGEN A PRODUCTO
productRoutes.post("/upload/:productId", authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const imag = req.files.image;
    if (!req.files) {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'No se subió el archivo'
        });
    }
    const validacionTipoImagen = imag.mimetype.includes('image');
    if (!validacionTipoImagen) {
        return res.status(400).json({
            estado: 'error',
            mensaje: 'Formato incorrecto'
        });
    }
    yield fileSystem.guardarImagenTemporal(productId, imag);
    const imagenes = fileSystem.imagenesDeTempHaciaPost(productId);
    let imagesProduct = "INSERT INTO IMAGENES (id_producto, nombre, id_estado)  VALUES(?,?,?)";
    const id_estado = '1';
    imagenes.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryPromess_1.default(imagesProduct, [productId, item, id_estado]);
    }));
    res.json({
        estado: 'success',
        data: imag
    });
}));
//EDITAR IMAGEN
productRoutes.put('/editImageStatus/:id', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datosToken = req.usuario;
    const { id } = req.params;
    const id_estado = req.body.id_estado;
    if (datosToken.idRol == '1') {
        yield queryPromess_1.default(`UPDATE imagenes set id_estado= ${id_estado} WHERE id_imagen = ${id}`, []);
        let commit = yield queryPromess_1.default("commit", []);
        res.json({
            estado: "success",
            mensaje: "Imagen editada con exito",
            data: commit
        });
    }
    else {
        res.json({
            estado: "Error",
            mensaje: "No tienes permisos de Administrador",
        });
    }
}));
//OBTENER IMAGEN (FISICA PARA VISUALIZAR EN FRONT)
productRoutes.get('/imagen/:productId/:img', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const img = req.params.img;
    const foto = fileSystem.getFotoUrl(productId, img);
    res.sendFile(foto);
    // const fotos = fileSystem.getFotosUrls(productId);
    // setTimeout(() => {
    //      res.sendFile(fotos);
    // }, 50);
}));
//OBTENER IMAGEN (REGISTROS DE LA TABLA PARA OBTENER EL ID)
productRoutes.get('/getImagesByOrderId/:idProducto', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    let products = yield queryPromess_1.default("Select * from imagenes where id_estado = 1 and id_producto = ?", [idProducto]);
    res.json({
        estado: "success",
        mensaje: "Se encontraron las imagenes para el producto",
        data: products
    });
}));
exports.default = productRoutes;

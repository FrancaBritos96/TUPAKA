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
const queryPromess_1 = __importDefault(require("./queryPromess"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = express_1.Router();
userRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.email;
    const pass = req.body.password;
    let passwordHaash = yield bcrypt_1.default.hashSync(pass, 10);
    if (user && pass) {
        queryPromess_1.default('SELECT * FROM usuarios where email = ?', [user]);
    }
}));
userRoutes.get('/consultarUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let documento = req.body.documento;
    let persona = yield queryPromess_1.default("Select * from usuarios where documento = ?", [documento]);
    res.json({
        data: persona
    });
}));
userRoutes.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id_rol = body.id_rol;
        const id_estado = body.id_estado;
        const email = body.email;
        const password = bcrypt_1.default.hashSync(req.body.password, 10);
        const nombre = body.nombre;
        const apellido = body.apellido;
        const documento = body.numero_documento;
        const direccion = body.direccion;
        const telefono = body.telefono;
        const nacionalidad = body.nacionalidad;
        const provincia = body.provincia;
        const localidad = body.localidad;
        const cod_postal = body.cod_postal;
        let queryTransaction = "START TRANSACTION";
        let queryUsuario = "INSERT INTO USUARIOS (id_rol, id_estado, email, password, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        //let queryUsuario = "INSERT INTO USUARIOS(id_usuario, nombre_usuario, password) VALUES(?,?,?)";
        yield queryPromess_1.default(queryTransaction, []);
        let insertarUsuarios = yield queryPromess_1.default(queryUsuario, [id_rol, id_estado, email, password, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal]);
        //await query(queryUsuario, [insertarPersona.insertId, nombre_usuario, password]);
        let commit = yield queryPromess_1.default("commit", []);
        res.json({
            estado: "Success",
            mensaje: "Usuario creado con exito",
            data: commit
        });
    }
    catch (error) {
        yield queryPromess_1.default("rollback", []);
        res.json({
            estado: "error",
            data: error
        });
    }
}));
exports.default = userRoutes;
// id_usuario int(11) AI PK 
// id_rol int(11) 
// id_estado int(11) 
// email varchar(60) 
// password varchar(45) 
// nombre varchar(45) 
// apellido varchar(45) 
// direccion varchar(150) 
// telefono varchar(20) 
// nacionalidad varchar(45) 
// Provincia varchar(45) 
// localidad varchar(45) 
// cod_postal varchar(45) 
// imagen varchar(150)
// userRoutes.post('/createUser', async (req: any, res: Response) => {
//     try {
//         const body = req.body;
//         const nombre = body.nombre;
//         const apellido = body.apellido;
//         const tipo_documento = body.tipo_documento;
//         const numero_documento = body.numero_documento;
//         const nombre_usuario = body.nombre_usuario;
//         const password = body.password
//         let queryTransaction = "START TRANSACTION"
//         let queryPersona = "INSERT INTO PERSONAS(nombre, apellido, tipo_documento, numero_documento) VALUES(?,?,?,?)";
//         let queryUsuario = "INSERT INTO USUARIOS(id_usuario, nombre_usuario, password) VALUES(?,?,?)";
//         await query(queryTransaction, []);
//         let insertarPersona:any = await query(queryPersona, [nombre, apellido, tipo_documento, numero_documento]);
//         await query(queryUsuario, [insertarPersona.insertId, nombre_usuario, password]);
//         let commit = await query("commit", []);
//         res.json({
//             estado: "Success",
//             mensaje: "Persona y Usuario creados con exito",
//             data: commit
//         })
//     }
//     catch (error) {
//         await query("rollback", []);
//         res.json({
//             estado: "error",
//             data: error
//         });
//     }
// })

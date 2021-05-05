"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const authentication_1 = require("../middlewares/authentication");
const userRoutes = express_1.Router();
userRoutes.get('/prueba', (req, res) => {
    res.json({
        estado: "sucess",
        mensaje: "ok"
    });
});
userRoutes.post('/login', (req, res) => {
    usuarios_model_1.default.findOne({ email: req.body.email }, null, null, (error, result) => {
        if (error) {
            throw error;
        }
        if (!result) {
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"
            });
        }
        if (result.comparePassword(req.body.password)) {
            const tokenjwt = token_1.default.getToken({
                id: result.id,
                nombre: result.nombre,
                email: result.email,
                avatar: result.avatar
            });
            return res.json({
                estado: "success",
                mensaje: "Usuario encontrado!",
                data: result,
                token: tokenjwt
            });
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"
            });
        }
    });
});
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuarios_model_1.default.create(user)
        .then(result => {
        res.json({
            estado: "success",
            mensaje: result
        });
    })
        .catch(error => {
        res.json({
            estado: "error",
            mensaje: error,
            error: error
        });
    });
});
userRoutes.put('/update', authentication_1.verificarToken, (req, res) => {
    let user = {};
    const atributos = ["nombre", "email", "avatar", "password"];
    atributos.forEach(item => {
        if (req.body[item] != null) {
            if (item == "password") {
                user[item] = bcrypt_1.default.hashSync(req.body[item], 10);
            }
            else {
                user[item] = req.body[item];
            }
        }
    });
    usuarios_model_1.default.findByIdAndUpdate(req.usuario.id, user, { new: true }, (error, result) => {
        if (error) {
            throw error;
        }
        if (!result) {
            res.json({
                estado: "success",
                mensaje: "usuario no existe en la base de datos"
            });
        }
        if (result) {
            res.json({
                estado: "success",
                mensaje: "Usuario modificado con exito",
                data: result,
                refreshToken: req.token
            });
        }
    });
});
exports.default = userRoutes;

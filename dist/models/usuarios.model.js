"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es necesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria"]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    }
});
usuarioSchema.method('comparePassword', function (password = "") {
    { /*// @ts-ignore */ }
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
const Usuario = mongoose_1.model('Usuario', usuarioSchema);
exports.default = Usuario;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const connectionMySql_1 = __importDefault(require("./bin/connectionMySql"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
server.start(() => {
    console.log('Servidor corriendo en puerto ' + server.puerto + '  y en host ' + server.host);
});
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas aplicación
server.app.use('/users', usuarios_1.default);
//localhost:3000/users/prueba
//Conexion a la base MySql
connectionMySql_1.default.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log('Aplicación conectada a base de datos MySql');
    }
});
mongoose_1.default.connect('mongodb://localhost:27017/appCurso_ProgWeb', { useNewUrlParser: true, useCreateIndex: true }, (error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Aplicacion conectada a base de datos Mongo");
    }
});

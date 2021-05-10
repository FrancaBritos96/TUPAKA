"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const connectionMySql_1 = __importDefault(require("./bin/connectionMySql"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const server = new server_1.default();
server.start(() => {
    console.log('Servidor corriendo en puerto ' + server.puerto + '  y en host ' + server.host);
});
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas aplicación
server.app.use('/users', users_1.default);
//Ejemplo: localhost:3000/users/createUser
//Conexion a la base MySql
connectionMySql_1.default.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log('Aplicación conectada a base de datos MySql');
    }
});

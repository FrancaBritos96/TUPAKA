import Server from './clases/server';
import connection from './bin/connectionMySql';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import categoriesRoutes from './routes/categories';
import sizesRoutes from './routes/sizes';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import FileSystem from './clases/file-system';



const server = new Server();

server.start(() => {
    console.log('Servidor corriendo en puerto ' + server.puerto + '  y en host ' + server.host);
});

//Body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());


//Upload
const crearFolder = new FileSystem();
crearFolder.createCarpetaUploads();
server.app.use(fileUpload());


//Rutas aplicación

server.app.use('/users', userRoutes);
server.app.use('/products', productRoutes);
server.app.use('/categories', categoriesRoutes);
server.app.use('/sizes', sizesRoutes);

//Ejemplo: localhost:3000/users/createUser



//Conexion a la base MySql
connection.connect((error) => {
    if (error) {
        throw error
    }
    else {
        console.log('Aplicación conectada a base de datos MySql')
    }
});

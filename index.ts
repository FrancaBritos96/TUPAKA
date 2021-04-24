import Server from './clases/server';
import userRoutes from './routes/usuarios';
import connection from './bin/connectionMySql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const server = new Server();

server.start(() => {
    console.log('Servidor corriendo en puerto ' + server.puerto + '  y en host ' + server.host);
});

//Body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());


//Rutas aplicación

server.app.use('/users', userRoutes)

//localhost:3000/users/prueba



//Conexion a la base MySql
connection.connect((error) => {
    if (error) {
        throw error
    }
    else {
        console.log('Aplicación conectada a base de datos MySql')
    }
});


mongoose.connect('mongodb://localhost:27017/appCurso_ProgWeb', 
        {useNewUrlParser:true, useCreateIndex:true},
        (error)=>{
            if(error){
                throw error
        }
        else{
            console.log("Aplicacion conectada a base de datos Mongo")
            }
        }
    
);
import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';
import usuarios from '../controllers/usuario'
import bcrypt from 'bcrypt';


const userRoutes = Router();


userRoutes.post('/login', async (req:Request, res:Response)=>{
    const user = req.body.email;
    const pass = req.body.password;
    let passwordHaash = await bcrypt.hashSync(pass, 10);
    
    if(user && pass){
        query('SELECT * FROM usuarios where email = ?', [user])
        
    }


})

userRoutes.post('/createUser', async (req: any, res: Response) => {
    try {
        const body = req.body;
        const id_rol = body.id_rol;
        const id_estado = body.id_estado;
        const email = body.email;
       const password = bcrypt.hashSync(req.body.password, 10);
        const nombre = body.nombre;
        const apellido = body.apellido;
        const documento = body.numero_documento;
        const direccion = body.direccion;
        const telefono = body.telefono;
        const nacionalidad = body.nacionalidad;
        const provincia = body.provincia;
        const localidad = body.localidad;
        const cod_postal = body.cod_postal;
        
        
        let queryTransaction = "START TRANSACTION"
        let queryUsuario = "INSERT INTO USUARIOS (id_rol, id_estado, email, password, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        //let queryUsuario = "INSERT INTO USUARIOS(id_usuario, nombre_usuario, password) VALUES(?,?,?)";

        await query(queryTransaction, []);
        let insertarUsuarios:any = await query(queryUsuario, [id_rol, id_estado, email, password, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal]);

        //await query(queryUsuario, [insertarPersona.insertId, nombre_usuario, password]);
        let commit = await query("commit", []);
        res.json({
            estado: "Success",
            mensaje: "Usuario creado con exito",
            data: commit
        })
    }
    catch (error) {
        await query("rollback", []);
        res.json({
            estado: "error",
            mensaje: "No se pudo crear el usuario",
            data: error
        });
    }
})

userRoutes.get('/getUserByDni', verificarToken, async (req: any, res: Response)=>{
    
    let documento = req.body.documento
    
        let user = await query("Select * from usuarios where documento = ?", [documento]);
        res.json({
            estado: "success",
            mensaje: "Se encontró el usuario",
            data: user
        })
    })
    
    userRoutes.get('/', verificarToken, usuarios.token); // Sirve para obtener la info del usuario logueado
    
    userRoutes.get('/getAllUsers', verificarToken, async (req: any, res: Response)=>{
        
            let users = await query("Select * from usuarios where id_estado = 1", []);
            res.json({
                estado: "success",
                mensaje: "Se encontraron los usuarios",
                data: users
            })
        })
        

export default userRoutes;

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
import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';
import usuarios from '../controllers/usuario'
import bcrypt from 'bcrypt';


const userRoutes = Router();


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
        let insertarUsuarios: any = await query(queryUsuario, [id_rol, id_estado, email, password, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal]);

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

userRoutes.get('/getUserByDni', verificarToken, async (req: any, res: Response) => {

    let documento = req.body.documento

    let user = await query("Select * from usuarios where documento = ?", [documento]);
    res.json({
        estado: "success",
        mensaje: "Se encontró el usuario",
        data: user
    })
})

userRoutes.get('/', verificarToken, usuarios.token); // Sirve para obtener la info del usuario logueado

userRoutes.get('/getAllUsers', verificarToken, async (req: any, res: Response) => {

    let users = await query("Select * from usuarios where id_estado = 1", []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los usuarios",
        data: users
    })
})


export default userRoutes;

import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';

const userRoutes = Router();

userRoutes.get('/consultarUsuario', async (req, res)=>{
    
let numero_documento = req.body.numero_documento

    let persona = await query("Select * from personas where numero_documento = ?", [numero_documento]);
    res.json({
        data:persona
    })
})

userRoutes.post('/createUser', async (req: any, res: Response) => {
    try {
        const body = req.body;
        const nombre = body.nombre;
        const apellido = body.apellido;
        const tipo_documento = body.tipo_documento;
        const numero_documento = body.numero_documento;
        const nombre_usuario = body.nombre_usuario;
        const password = body.password

        let queryTransaction = "START TRANSACTION"
        let queryPersona = "INSERT INTO PERSONAS(nombre, apellido, tipo_documento, numero_documento) VALUES(?,?,?,?)";
        let queryUsuario = "INSERT INTO USUARIOS(id_usuario, nombre_usuario, password) VALUES(?,?,?)";

        await query(queryTransaction, []);
        let insertarPersona:any = await query(queryPersona, [nombre, apellido, tipo_documento, numero_documento]);
        await query(queryUsuario, [insertarPersona.insertId, nombre_usuario, password]);
        let commit = await query("commit", []);
        res.json({
            estado: "Success",
            mensaje: "Persona y Usuario creados con exito",
            data: commit
        })
    }
    catch (error) {
        await query("rollback", []);
        res.json({
            estado: "error",
            data: error
        });
    }
})

export default userRoutes;

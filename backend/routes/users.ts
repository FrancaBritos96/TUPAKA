import { Router, Request, Response } from 'express';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'
import jwt from 'jsonwebtoken';
import query from './queryPromess';
import usuarios from '../controllers/usuario'
import bcrypt from 'bcrypt';
import connection from '../bin/connectionMySql';

const userRoutes = Router();

//LOGIN
userRoutes.post('/login', async (req: Request, res: Response) => {

    try {
        const email = req.body.email;
        const pass = req.body.pass;

        let passwordHaash = await bcrypt.hash(pass, 8);

        if (email && pass) {

            connection.query('SELECT * FROM usuarios where email = ?', [email], async (error, results) => {
                if (results.length == 0 || !(await bcrypt.compare(pass, results[0].password))) {

                    res.json({
                        estado: "success",
                        mensaje: "Usuario o Contraseña Incorrectos",

                    })

                } else {

                    const TokenJwt = Token.getToken({
                        id: results.id_usuario,
                        nombre: results.nombre,
                        apellido: results.apellido,
                        dni: results.dni,
                        email: results.email,
                        idRol: results.id_rol,
                    });

                    res.json({
                        estado: "success",
                        mensaje: "¡LOGIN CORRECTO!",
                        data: results,
                        token: TokenJwt

                    })

                }
                res.end();
            });

        } else {

            res.send('Please enter user and Password!');
            res.end();
        }

    } catch (error) {
        await query("rollback", []);
        res.json({
            estado: "error",
            data: error
        });
    }
});

//Consultar un Usuario por DNI
userRoutes.get('/consultarUsuario', async (req, res) => {

    let documento = req.body.documento

    let persona = await query("Select * from usuarios where documento = ?", [documento]);
    res.json({
        mensaje: 'Usuario encontrado',
        data: persona
    })
})


//Crear un Usuario. 
userRoutes.post('/createUser', async (req: any, res: Response) => {
    try {
        const body = req.body;
        const id_rol = body.id_rol;
        const id_estado = body.id_estado;
        const email = body.email;
        const password = body.password //        bcrypt.hashSync(req.body.password, 10);
        const nombre = body.nombre;
        const apellido = body.apellido;
        const documento = body.numero_documento;
        const direccion = body.direccion;
        const telefono = body.telefono;
        const nacionalidad = body.nacionalidad;
        const provincia = body.provincia;
        const localidad = body.localidad;
        const cod_postal = body.cod_postal;
        let passEncriptado = await bcrypt.hash(password, 8)


        let queryTransaction = "START TRANSACTION"
        let queryUsuario = "INSERT INTO USUARIOS (id_rol, id_estado, email, password, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
     
        await query(queryTransaction, []);
        let insertarUsuarios: any = await query(queryUsuario, [id_rol, id_estado, email, passEncriptado, nombre, apellido, documento, direccion, telefono, nacionalidad, provincia, localidad, cod_postal]);

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
            data: error
        });
    }
})

export default userRoutes;


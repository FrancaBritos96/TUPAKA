import { Router, Request, Response } from 'express';
import Usuario from '../models/usuarios.model';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/authentication'

const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, res: Response) => {
    res.json({
        estado: "sucess",
        mensaje: "ok"
    })
});

userRoutes.post('/login', (req: Request, res: Response) => {
    Usuario.findOne({ email: req.body.email }, null, null, (error, result) => {
        if (error) {
            throw error
        }
        if (!result) {
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"
            })
        }

        if (result.comparePassword(req.body.password)) {
            const tokenjwt = Token.getToken({
                id: result.id,
                nombre: result.nombre,
                email: result.email,
                avatar: result.avatar
            })

            return res.json({
                estado: "success",
                mensaje: "Usuario encontrado!",
                data: result,
                token: tokenjwt
            })
        }
        else {
            return res.json({
                estado: "success",
                mensaje: "usuario no encontrado en base de datos"
            })
        }
    })
})

userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }


    Usuario.create(user)
        .then(result => {
            res.json({
                estado: "success",
                mensaje: result
            })
        })
        .catch(error => {
            res.json({
                estado: "error",
                mensaje: error,
                error: error
            })
        })

});

userRoutes.put('/update', verificarToken, (req: any, res: Response) => {
    
    let user: any = {};
    const atributos = ["nombre", "email", "avatar", "password"];

    atributos.forEach(item=>{
        if(req.body[item] != null){
            if(item == "password"){
                user[item] = bcrypt.hashSync(req.body[item], 10)
            }
            else {
                user[item] = req.body[item];
            }
        }
    })

    Usuario.findByIdAndUpdate(req.usuario.id, user, { new: true }, (error, result) => {
        if (error) {
            throw error
        }
        if (!result) {
            res.json({
                estado: "success",
                mensaje: "usuario no existe en la base de datos"
            })
        }
        if (result) {
            res.json({
                estado: "success",
                mensaje: "Usuario modificado con exito",
                data: result,
                refreshToken: req.token
            })
        }
    })
})

export default userRoutes;
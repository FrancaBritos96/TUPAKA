import{getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {User} from '../entity/User';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';
import {validate} from 'class-validator';

class AuthCOntroller {
    static login = async(req: Request, res: Response)=>{
        const {username, password}= req.body;

//comporbar que reciba las dos propiedades que necesitamos

        if (!(username && password)){
            return res.status(400).json({ message: ' Username & Password son requeridos'});
        }

        const userRepository = getRepository(User);
        let user :User;

        try{//buscamos el usuario. En caso de tenerlo, lo devolvemos al from. En caso de que no. Error 400
            user = await userRepository.findOneOrFail({ where:{username}});
        } catch (e) {
            return res.status(400).json({message: ' Username or Password Incorrectos'})
        }

        // CHECK PSW
            if(!user.checkPassword(password)){
                return res.status(400).json({message: 'Usuario o Password son incorrectos!'})
            }

            const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, {expiresIn: '1h'});

        res.json({message: 'OK', token});

    };

    static changePassword = async(req:Request, res:Response)=> {
        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword}= req.body;

        if(!(oldPassword && newPassword) ){
            res.status(400).json({message: 'Password antiguo y nuevo Password son requeridos'});
        }
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(userId);
        }
        catch(e) {
            res.status(400).json({message: 'Ups. Algo salio mal'});

        }
        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message: 'Verifica el password antiguo'});

        }
        user.password = newPassword;
        const validtaionOps = {validationError: { target: false, value: false}};
        const errors = await validate(user, validtaionOps);

        if(errors.length>0){
            return res.status(400).json(errors);
        }
        //Hash Password
        user.hashPassword();
        userRepository.save(user);

        res.json({ message: 'Password cambiado con exito'})
    };

}

export default AuthCOntroller;






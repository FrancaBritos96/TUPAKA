import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';

export class UserController {

    //Creacion de los metodos 

    static getAll = async (req: Request, res:Response)=>{
        const userRepository = getRepository(User);
        const user = await userRepository.find();

        if(user.length>0){
            res.send(user);

        }else{
            res.status(404).json({message: 'Not Result'});
        }
    }

    static getById = async (req: Request, res: Response)=>{
        const {id} = req.params;
        const userRepository= getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }
        catch(e){
            res.status(404).json({message: 'No Resultados'});

        }
    }
    
    static newUser = async (req: Request, res: Response)=>{
        const {username, password, role} = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        //Validaciones

        const validationOpt = {validationError: { target: false, value: false} };
        const errors = await validate(user, validationOpt);
        
        if(errors.length>0){
        return res.status(400).json(errors);
        }

        //TODO: HASH PASSW. 

        const userRepository=getRepository(User);
        try{
            user.hashPassword();
            await userRepository.save(user);
        }
        catch(e){
            return res.status(409).json({message: 'Username already exist'});
        }

        //ALL ok. 
         res.send('Usuario Creado');
        
    }
    
    static editUser = async (req: Request, res: Response)=>{
        let user;
        //Recuperamos la informacion que nos llega desde el FRONT
        const{id} = req.params;
        const {username, role} = req.body;

        const userRepository = getRepository(User);
        //tratamos de buscar al usuario
        try {
            //Si recuperamos al usuario entramos por aca y lo almacenamos en la variable user
            user = await userRepository.findOneOrFail(id);
            //lo asignamos a estas propiedades. Y modificamos el valor de la base de datos por los datos que el usuario previamente edito. 
            user.username = username;
            user.role = role;
        }
        //Si el usuario no se encuentra, entra aca y da error. 
        catch (e){
            res.status(404).json({message: 'Usuario no encontrado'})
        }
            //validamos los datos nuevos. Usuario editado y comprobamos que no tenga error. Es decir que el usuario sea menor a 0.
            // Es decir que no tenga nada escrito

                const validationOpt = {validationError: { target: false, value: false} };
                const errors = await validate(user, validationOpt);


                if (errors.length>0) {
                    return res.status(400).json(errors);
                }
                //Try to save
                
                try {
                    await userRepository.save(user);

                }
                catch(e){
                    //Si falla es porque el usuario que quiere updatear con los datos nuevos ya existe. 
                    return res.status(409).json({ message: 'Usuario ya existente'});
                    
                }
                //enviamos el mensaje de usuario updateado
                res.status(201).json({ message: 'User update'});

    }

    static deleteUser = async (req: Request, res: Response)=>{
        //recuperamos el id
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try{
            //buscamos nuestro usuario en la base de datos
            user = await userRepository.findOneOrFail(id);
       }
       catch(e){
           //si no recupera nada. Nos da error 404
           return res.status(404).json({message: 'Usuario no encontrado'})
       }

       //En caso de ecnontrar el usuario lo borra. 

       userRepository.delete(id);
       res.status(201).json({ message: ' Usuario borrado'});


    }
}

export default UserController;

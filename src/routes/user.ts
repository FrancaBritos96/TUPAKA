import {Router} from 'express';
import { useContainer } from 'typeorm';
import {UserController} from './../controller/UserController';
import {checkJwt} from './../middlewares/jwt';
import {checkRole} from './../middlewares/rol';


const router = Router();


//METODOS

//Get all users
//solo el admin puede usar estos metodos. Por eso usamos el token para validar. 

router.get('/',[checkJwt, checkRole(['admin'])], UserController.getAll);

//get one user
//con el checkjwt verifica el token. Con el CheckRol verifica que solo el ADMIN pueda crear usuarios nuevos. 

router.get('/:id',[checkJwt, checkRole(['admin'])], UserController.getById);

//Create a new user

router.post ('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

//Edit user

router.patch('/:id',[checkJwt, checkRole(['admin'])], UserController.editUser);

//Delete

router.delete('/:id',[checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router; 
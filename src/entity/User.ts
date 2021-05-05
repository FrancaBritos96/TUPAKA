import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {MinLength, IsNotEmpty} from 'class-validator';
import * as bcrypt from 'bcryptjs';
//TODO IsEmail

@Entity()
@Unique(['username'])

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    username: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

//metodo para encriptas el psw
    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
//metodo devuelve true o false. cuando el user quiere oguearse SI el paswword conincide con el de la base devuelve true. 
   checkPassword(password: string):boolean{
       return bcrypt.compareSync(password, this.password);
   }

}

export interface IUser {
    id_usuario?: number;
    id_rol?: number;
    id_estado?: number;
    email?: string;
    password?: string;
    nombre?: string;
    apellido?: string;
    documento?: number;
    direccion?: string;
    telefono?: number;
    nacionalidad?: string;
    provincia?: string;
    localidad?: string;
    cod_postal?: string;
    }

    export class User implements IUser {
      id_usuario?: number;
      id_rol?: number;
      id_estado?: number;
      email?: string;
      password?: string;
      nombre?: string;
      apellido?: string;
      documento?: number;
      direccion?: string;
      telefono?: number;
      nacionalidad?: string;
      provincia?: string;
      localidad?: string;
      cod_postal?: string;
    
      constructor() {
        };
      }
    
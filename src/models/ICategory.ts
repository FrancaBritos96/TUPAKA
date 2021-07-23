export interface ICategory {

    id_categoria?: number;
    id_estado?: number;
    nombre?: string;
    descripcion?: string;
}


export class Category implements ICategory {
    id_categoria?: number;
    id_estado?: number;
    nombre?: string;
    descripcion?: string;

    constructor() {
    };
}
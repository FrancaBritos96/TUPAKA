export interface INewProducts {

    id_producto?: number;
    id_categoria?: number;
    id_estado?: number;
    id_tamano?: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    imagen?: string;
}


export class NewProduct implements INewProducts {
    id_producto?: number;
    id_categoria?: number;
    id_estado?: number;
    id_tamano?: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    imagen?: string;

    constructor() {
    };
}
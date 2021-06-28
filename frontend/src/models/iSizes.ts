export interface ISizes {

    id_tamano?: number;
    id_estado?: number;
    nombre?: string;
    ancho?: number;
    profundidad?: number;
    alto?: number;
}


export class Size implements ISizes {
    id_tamano?: number;
    id_estado?: number;
    nombre?: string;
    ancho?: number;
    profundidad?: number;
    alto?: number;

    constructor() {
    };
}
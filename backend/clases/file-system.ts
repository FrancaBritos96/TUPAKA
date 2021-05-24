import path from 'path';
import fs from 'fs';
import uniqId from 'uniqid';
import { IfileUpload } from '../interfaces/file-upload';

export default class FileSystem {
    constructor() { }

    private crearCarpetaUsuario(userId: string): string {
        const pathUser = path.resolve(__dirname, '../uploads', userId);
        const pathUserTemp = pathUser + "/temp";
        console.log("ruta pathUser", pathUser);

        const existe: boolean = fs.existsSync(pathUser);

        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;

    }

    private generarNombreUnico(nombreOriginal: string): string {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqId();

        return `${idUnico}.${extension}`;

    }

    guardarImagenTemporal(userId: string, file: IfileUpload): Promise<any> {
        return new Promise((resolve, reject) => {
            const path: string = this.crearCarpetaUsuario(userId);
            const nombreArchivo: string = this.generarNombreUnico(file.name);

            file.mv(`${path}/${nombreArchivo}`, (error: any) => {
                if (error) {
                    return reject(error);
                }
                else {
                    return resolve(true);
                }
            })
        })


    }

    private obtenerImagenesTemp(userId: string): Array<string> {
        const pathName = path.resolve(__dirname, '../uploads', userId, "temp");
        return fs.readdirSync(pathName); //[nombre_archivo1, nombre_archivo2..]
    }

    imagenesDeTempHaciaPost(userId: string): Array<string> {
        const pathUserTemp = path.resolve(__dirname, '../uploads', userId, "temp"); //De donde: origen
        const pathUserPost = path.resolve(__dirname, '../uploads', userId, "post"); //Hacia donde: destino

        if (!fs.existsSync(pathUserTemp)) {
            return [];
        }

        if (!fs.existsSync(pathUserPost)) {
            fs.mkdirSync(pathUserPost);
        }

        const imagenesTemp: Array<string> = this.obtenerImagenesTemp(userId);
        imagenesTemp.forEach(imagenes => {
            fs.renameSync(`${pathUserTemp}/${imagenes}`, `${pathUserPost}/${imagenes}`)
        })

        return imagenesTemp
    }

    getFotoUrl(userId: string, img: string) {
        const pathFoto: string = path.resolve(__dirname, '../uploads', userId, "post");

        if (fs.existsSync(pathFoto)) {
            return pathFoto;
        }
        else {
            return path.resolve(__dirname, '../assets/default.jpg')
        }

    }

    createCarpetaUploads(): void {
        const pathUploads = path.resolve(__dirname, 'uploads');

        if (!fs.existsSync(pathUploads)) {
            fs.mkdirSync(pathUploads);
        }
    }
}
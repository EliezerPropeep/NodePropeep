import { Cedula } from "../../../Core/Entities/Cedula";


export interface ICedulaService {
    buscarCedulaOnline(strCedula: string): Promise<Cedula | null>;
}
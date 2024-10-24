import { Cedula } from "../../Core/Entities/Cedula";
import { ICedulaRepository } from "../Interfaces/Repositories/ICedulaRepository";
import { ICedulaService } from "../Interfaces/Services/ICedulaService";


export class CedulaService implements ICedulaService {
    private cedulaRepository: ICedulaRepository;

    constructor(cedulaRepository: ICedulaRepository) {
        this.cedulaRepository = cedulaRepository;
    }

    async buscarCedulaOnline(strCedula: string): Promise<Cedula | null> {
        // Validación de la cédula
        if (!strCedula || (strCedula.length !== 13 && strCedula.length !== 11)) {
            return null;
        }

        try {
            // Quitar guiones de la cédula
            const cedula = strCedula.replace("-", "");
            const c1 = cedula.substring(0, 3);
            const c2 = cedula.substring(3, 10);  // Corregido para incluir 7 caracteres
            const c3 = cedula.substring(10, 11);

            const urlString = `${c1}&ID2=${c2}&ID3=${c3}`;

            // Llamada al repositorio para obtener la información
            const cedulaInfo = await this.cedulaRepository.getById(urlString);
            return cedulaInfo;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error al buscar la cédula:", error.message);
            } else {
                console.error("Error al buscar la cédula:", error);
            }
            return null;
        }
    }
}

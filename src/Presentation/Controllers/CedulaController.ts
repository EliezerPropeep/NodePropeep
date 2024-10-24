import { Request, Response, Router } from 'express';
import { ICedulaService } from '../../Application/Interfaces/Services/ICedulaService';
import dotenv from 'dotenv';

// Cargar el archivo apikey.env
dotenv.config({ path: 'apikey.env' });

export class CedulaController {
    private readonly cedulaService: ICedulaService;
    public router: Router;

    // Obtener la API key desde las variables de entorno
    private readonly validApiKey: string = process.env.API_KEY || '';

    constructor(cedulaService: ICedulaService) {
        this.cedulaService = cedulaService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:strCedula', this.buscarCedula.bind(this));
    }

    // Función para verificar la API key
    private checkApiKey(req: Request): boolean {
        const apiKeyFromHeader = req.headers['x-api-key'];
        const apiKeyFromParams = req.query.apiKey;

        // Verificar si la API key está en los headers o en los parámetros de la URL
        return apiKeyFromHeader === this.validApiKey || apiKeyFromParams === this.validApiKey;
    }

    public async buscarCedula(req: Request, res: Response): Promise<void> {
        // Verificar la API key antes de procesar la solicitud
        if (!this.checkApiKey(req)) {
            res.status(401).json({ message: 'API key inválida o faltante' });
            return;
        }

        const strCedula = req.params.strCedula;
        
        try {
            const cedula = await this.cedulaService.buscarCedulaOnline(strCedula);

            if (!cedula) {
                res.status(404).json({ message: 'Cedula incorrecta' });
                return;
            }

            const formattedCedula = `${strCedula.slice(0, 3)}-${strCedula.slice(3, 10)}-${strCedula.slice(10)}`;

            res.json({
                id: formattedCedula,
                nombre: cedula.nombre,
                primerApellido: cedula.primerApellido,
                segundoApellido: cedula.segundoApellido,
                apellidoConyuge: cedula.apellidoConyuge || null,
                fechaNacimiento: cedula.fechaNacimiento,
                lugarNacimiento: cedula.lugarNacimiento,
                sexo: cedula.sexo,
                estadoCivil: cedula.estadoCivil,
                estado: cedula.estado,
                rutaFoto: cedula.rutaFoto
            });
        } catch (error) {
            console.error('Error al buscar la cédula:', error instanceof Error ? error.message : error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}


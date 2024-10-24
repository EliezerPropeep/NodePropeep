import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { Cedula } from '../../Core/Entities/Cedula';
import { ICedulaRepository } from '../../Application/Interfaces/Repositories/ICedulaRepository';


export default class CedulaRepository implements ICedulaRepository {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://dataportal.jce.gob.do/idcons/IndividualDataHandler.aspx?ServiceID=cf257911-87f4-4648-aa6c-fdb2c095f86c&ID1=';
    }

    async getById(id: string): Promise<Cedula | null> {
        try {
            const url = `${this.baseUrl}${id}`;
            
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/58.0.3029.110 Safari/537.3',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'es-ES,es;q=0.8',
                    'Referer': 'https://example.com',
                }
            });

            if (response.status !== 200) {
                throw new Error(`Error al obtener la entidad: ${response.status}`);
            }

            const xmlContent = response.data;
            return this.parseXml(xmlContent);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener la entidad:', error.message);
            } else {
                console.error('Error al obtener la entidad:', error);
            }
            throw error;
        }
    }

    async parseXml(xmlContent: string): Promise<Cedula | null> {
        try {
            const result = await parseStringPromise(xmlContent);
            const data = new Cedula(''); // Proporciona al menos el ID

            const cedulaData = result['root']; // Ajusta según la estructura de tu XML

            if (cedulaData) {
                data.nombre = cedulaData['nombres']?.[0];
                data.primerApellido = cedulaData['apellido1']?.[0];
                data.segundoApellido = cedulaData['apellido2']?.[0];
                data.fechaNacimiento = cedulaData['fecha_nac']?.[0];
                data.lugarNacimiento = cedulaData['lugar_nac']?.[0];
                data.sexo = cedulaData['ced_a_sexo']?.[0];
                data.estadoCivil = cedulaData['est_civil']?.[0];
                data.estado = cedulaData['estatus']?.[0];
                data.rutaFoto = `http://dataportal.jce.gob.do/${cedulaData['fotourl']?.[0]}`;
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al parsear el XML:', error.message);
            } else {
                console.error('Error al parsear el XML:', error);
            }
            throw error;
        }
    }
}

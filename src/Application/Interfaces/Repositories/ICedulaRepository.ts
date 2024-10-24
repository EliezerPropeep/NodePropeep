import { Cedula } from '../../../Core/Entities/Cedula';

export interface ICedulaRepository {
    getById(id: string): Promise<Cedula | null>;
}

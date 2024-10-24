import express from 'express';
import CedulaRepository from './Infrastructure/Repositories/CedulaRepository';
import { CedulaService } from './Application/Services/CedulaServices';
import { CedulaController } from './Presentation/Controllers/CedulaController';


const app = express();
const port = process.env.PORT || 3000;

// Instancia del repositorio y el servicio
const cedulaRepository = new CedulaRepository();
const cedulaService = new CedulaService(cedulaRepository);

// Instancia del controlador
const cedulaController = new CedulaController(cedulaService);

app.use(express.json());

// Usa las rutas del controlador
app.use('/api/cedula', cedulaController.router);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

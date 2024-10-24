import { CedulaService } from "./Application/Services/CedulaServices";
import CedulaRepository from "./Infrastructure/Repositories/CedulaRepository";
import { CedulaController } from "./Presentation/Controllers/CedulaController";

const express = require('express');
const dotenv = require('dotenv');


// Cargar el archivo .env
dotenv.config({ path: 'apikey.env' });

const app = express();
const port = process.env.PORT || 3000;

// Instancia del repositorio
const cedulaRepository = new CedulaRepository();

// Instancia del servicio con el repositorio inyectado
const cedulaService = new CedulaService(cedulaRepository);

// Instancia del controlador con el servicio inyectado
const cedulaController = new CedulaController(cedulaService);

app.use('/api/cedula', cedulaController.router);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

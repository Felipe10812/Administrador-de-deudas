import express, { Application } from 'express';
import cors from 'cors';
import routesDeudas from '../routes/Deudas';
import routerUsers from '../routes/user';
import routerDrop from '../routes/dropdown';
import routerPagos from '../routes/Pagos';
import dotenv from 'dotenv';
import sequelize from '../db/connection';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '1'; // Asegúrate de que PORT esté en el archivo .env
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnector();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto: ', this.port);
        });
    }

    routes() {
        this.app.use('/api/', routesDeudas);
        this.app.use('/api/', routerPagos);
        this.app.use('/api/users', routerUsers);
        this.app.use('/api/delete', routerUsers);
        this.app.use('/api/', routerDrop);
    }

    midlewares() {
        // Parsear el body de las peticiones
        this.app.use(express.json());

        // Habilitar CORS
        this.app.use(cors());
    }

    async dbConnector() {
        try {
            // Intentar conectar a la base de datos usando Sequelize
            await sequelize.authenticate();
            console.log('Conexión exitosa a la base de datos.');
        } catch (error) {
            console.error('Imposible conectar a la base de datos:', error);
        }
    }
}

export default Server;
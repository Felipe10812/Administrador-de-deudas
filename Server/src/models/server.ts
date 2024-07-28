import express, { Application } from 'express';
import cors from 'cors';
import routesDeudas from '../routes/Deudas';
import routerUsers from '../routes/user';
import routerDrop from '../routes/dropdown';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnector();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto: ', + this.port);
            this.dbConnector();
        })
    }

    routes() {
        this.app.use('/api/Deudas', routesDeudas);
        this.app.use('/api/users', routerUsers);
        this.app.use('/api/MediosPrestamo', routerDrop);
    }

    midlewares() {
        // Parseo body 
        this.app.use(express.json());

        // Cores
        this.app.use(cors())
    }

    async dbConnector() {
        try {
            console.log("La Conexion finciono")
        } catch (error) {
            console.error('Imposible conectar a la base de datos', error);
        }
    }
}

export default Server;
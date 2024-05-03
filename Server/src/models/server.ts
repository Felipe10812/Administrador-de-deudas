import express, { Application } from 'express';
import routesDeudas from '../routes/Deudas';
import routerUsers from '../routes/user';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
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
    }

    midlewares() {
        this.app.use(express.json());
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
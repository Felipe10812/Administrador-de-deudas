"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Deudas_1 = __importDefault(require("../routes/Deudas"));
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnector();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto: ', +this.port);
            this.dbConnector();
        });
    }
    routes() {
        this.app.use('/api/Deudas', Deudas_1.default);
        this.app.use('/api/users', user_1.default);
    }
    midlewares() {
        // Parseo body 
        this.app.use(express_1.default.json());
        // Cores
        this.app.use((0, cors_1.default)());
    }
    dbConnector() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("La Conexion finciono");
            }
            catch (error) {
                console.error('Imposible conectar a la base de datos', error);
            }
        });
    }
}
exports.default = Server;

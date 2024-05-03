import { Request, Response } from "express";
import DefinicionDeudas from "../models/Deudas";

export const getDeudas = async (req: Request, res: Response) => {
    const ListaDeudas = await DefinicionDeudas.findAll();
    res.json(ListaDeudas);
}  
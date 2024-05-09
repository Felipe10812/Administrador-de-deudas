export interface Deudas {
    IdPrestamo: number,
    IdUsuario: number,
    IdMedioPrestamo: number,
    Cantidad: number,
    Motivo: string,
    FechaRegistro: Date,
    FechaModificacion: Date,
    EsActivo: boolean
}
export interface PAgos {
    IdPrestamo: number,
    IdUsuario: number,
    IdMedioPrestamo: number,
    Cantidad: number,
    Motivo: string,
    FechaRegistro: Date,
    FechaModificacion: Date,
    EsActivo: boolean
}

export interface AgregarPago {
    IdUsuario: number,
    IdMedioPago: number,
    Cantidad: number,
    Motivo: string,
    FechaRegistro: Date
}
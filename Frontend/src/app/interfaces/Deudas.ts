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

export interface Deudores {
    IdUsuario: number,
    Nombre: string,
    Cantidad: number
}

export interface AgregarDeuda {
    IdUsuario: number,
    IdMedioPrestamo: number,
    Cantidad: number,
    Motivo: string
    FechaRegistro: Date
}
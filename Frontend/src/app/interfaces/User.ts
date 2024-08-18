export interface Usuario {
    userName: string,
    password: string,
    Correo: string
}

export interface loginUsuario {
    Correo: string,
    password: string
}

export interface deleteUseario {
    IdUsuario: number,
    esActivo: boolean
}

export interface deleteRegistro {
    IdUsuario: number,
    IdPago: number,
    Tipo: string
}
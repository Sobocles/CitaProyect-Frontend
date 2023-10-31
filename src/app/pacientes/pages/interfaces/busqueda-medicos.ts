export interface Bloque {
    medicoNombre: string;
    hora_inicio: string;
    hora_fin: string;
    precio: number;
}

export interface BloquesResponse {
    ok: boolean;
    bloques: Bloque[];
}

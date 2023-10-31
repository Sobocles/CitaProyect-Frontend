export interface Horario {
    dia: string;
    horarioApertura: string | null;
    horarioCierre: string | null;
}

export interface HorarioClinicaResponse {
    ok: boolean;
    horariosClinica: Horario[];
}
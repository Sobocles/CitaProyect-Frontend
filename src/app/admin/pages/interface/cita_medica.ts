export interface CitaMedica {
    idCita: number;
    motivo: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    paciente: {
        nombre: string;
    };
    medico: {
        nombre: string;
    };
    tipoCita: {
        tipo_cita: string;  // Cambiado de 'especialidad_medica' a 'tipo_cita'
    };
}

export interface CitasResponse {
    ok?: boolean;  
    citas: CitaMedica[];
}

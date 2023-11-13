export interface Historial {
    id_historial: number;
    diagnostico: string;
    medicamento: string;
    notas: string;
    fecha_consulta: string;
    archivo: string;
    createdAt: string;
    updatedAt: string;
    rut_medico: string; // Añadido rut del médico
    rut_paciente: string; // Añadido rut del paciente
   
}

export interface HistorialResponse {
    historiales: Historial[];
    total: number;
}
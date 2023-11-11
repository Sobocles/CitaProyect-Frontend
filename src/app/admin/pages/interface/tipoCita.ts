export interface tipoCitaResponse {
    tipo_cita: Tipo_cita[];
  }
  
  export interface Tipo_cita {
    idTipo: number;
    tipo_cita: string;
    precio: number;
    especialidad_medica: string;
    duracion_cita: number;
    createdAt: string;
    updatedAt: string;
  }
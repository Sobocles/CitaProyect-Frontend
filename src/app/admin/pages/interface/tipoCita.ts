export interface tipoCitaResponse {
    tipo_cita: Tipo_cita[];
  }
  
  export interface Tipo_cita {
    idTipo: number;
    tipo_cita: string;
    precio: number;
    especialidad_medica: string;
    color_etiqueta: string;
    createdAt: string;
    updatedAt: string;
  }
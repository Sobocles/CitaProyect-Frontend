import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { CitaMedica, CitasResponse } from '../interface/cita_medica';
import { Observable } from 'rxjs';
import { CitasResponsex } from '../interface/cita_medicaResponse';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CitaMedicaService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { 
      headers: {
      'Authorization': `Bearer ${this.token}`
      }
    }
}
  constructor( private http: HttpClient) { }

  
  crearCitaMedica( formData: any ){    
    return this.http.post<any>(`${base_url}/cita_medica`,formData, this.headers)

  }

  crearCitaMedicaPaciente(formData: any, rutPaciente: string) {
    // Incluye el rutPaciente en el objeto formData
    const data = {
      ...formData,
      rutPaciente: rutPaciente // Suponiendo que el backend espera una propiedad 'rutPaciente'
    };

    console.log('AQUI ESTA LA DATA',data);
    
    // Ahora, envía solo data y las opciones (que incluyen los headers)
    return this.http.post<any>(`${base_url}/cita_medica/crearCitapaciente`, data, this.headers);
  }
  

  obtenerCitaMedicaPorId(  horarioId: number ):Observable<CitasResponse>{ //aca role no viene como parametro (viene email y nombre en this.perfilForm.value) pero aun asi funciona ya que role simplemente se ignora
    
    return this.http.get<CitasResponse>(`${ base_url }/cita_medica/${horarioId}`, this.headers) //Para actualizar los datos del usuario se necesita enviar al backend El id que se obtiene de un metodo get que me da el id del usuario logeado que es el mismo que esta intentando actualizar sus datos, la data que se quiere actualizar que es enviada por un formulario y los header con el token de acceso
     
  }

  cargarCitaMedica(desde: number = 0) {
    console.log('aqui esta el desde',desde)
    const url = `${base_url}/cita_medica?desde=${desde}`;
    return this.http.get<CitasResponse>(url, this.headers);
  }

  borrarCitaMedica( id: number ){
    const url = `${ base_url }/cita_medica/${ id }`;
    return this.http.delete( url, this.headers );
  }

  actualizarCita(id: number, data: any): Observable<any> {
    console.log(id);
    console.log(data);
    const url = `${ base_url }/cita_medica/${ id }`;
    return this.http.put(url, data, this.headers);
  }

}

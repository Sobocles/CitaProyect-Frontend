import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { CitasResponse } from '../interface/cita_medica';
import { Observable } from 'rxjs';

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

  
  crearCitaMedica( formData: CitasResponse  ){    
    return this.http.post<CitasResponse>(`${base_url}/cita_medica`,formData, this.headers)

  }

  obtenerCitaMedicaPorId(  horarioId: number ):Observable<CitasResponse>{ //aca role no viene como parametro (viene email y nombre en this.perfilForm.value) pero aun asi funciona ya que role simplemente se ignora
    
    return this.http.get<CitasResponse>(`${ base_url }/cita_medica/${horarioId}`, this.headers) //Para actualizar los datos del usuario se necesita enviar al backend El id que se obtiene de un metodo get que me da el id del usuario logeado que es el mismo que esta intentando actualizar sus datos, la data que se quiere actualizar que es enviada por un formulario y los header con el token de acceso
     
  }

  cargarCitaMedica(desde: number = 0) {
    const url = `${base_url}/cita_medica?desde=${desde}`;
    return this.http.get<CitasResponse>(url, this.headers);
  }

  borrarCitaMedica( id: number ){
    const url = `${ base_url }/cita_medica/${ id }`;
    return this.http.delete( url, this.headers );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HorarioMedico, HorarioResponse } from '../interface/horarioMedico';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HorarioMedicoService {

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

  crearHorario( formData: HorarioMedico  ){    
    return this.http.post<HorarioMedico>(`${base_url}/horario_medico`,formData, this.headers)

  }

  obtenerHorarioPorId(  horarioId: number ){ //aca role no viene como parametro (viene email y nombre en this.perfilForm.value) pero aun asi funciona ya que role simplemente se ignora
    
    return this.http.get(`${ base_url }/horario_medico/${horarioId}`, this.headers) //Para actualizar los datos del usuario se necesita enviar al backend El id que se obtiene de un metodo get que me da el id del usuario logeado que es el mismo que esta intentando actualizar sus datos, la data que se quiere actualizar que es enviada por un formulario y los header con el token de acceso
     
  }

  cargarHorario(desde: number = 0) {
    const url = `${base_url}/horario_medico?desde=${desde}`;
    return this.http.get<HorarioResponse>(url, this.headers);
  }

  borrarHorario( id: number ){
    console.log(id);
    const url = `${ base_url }/horario_medico/${ id }`;
    return this.http.delete( url, this.headers );
  }

  editarHorario(horario: HorarioMedico): Observable<any> {
    return this.http.put(`${ base_url }/horario_medico/${horario.idHorario}`, horario, this.headers);
  }



}

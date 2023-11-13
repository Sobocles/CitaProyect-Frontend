import { Injectable } from '@angular/core';
import { Medico, MedicoResponse } from '../interface/medicos'
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class MedicoService {

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

  crearMedico( formData: Medico  ): Observable<Medico>{
    console.log('creando medico')    
    return this.http.post(`${base_url}/medicos`,formData, this.headers)
        .pipe(
            tap( (resp:any) => { 
             
              
            })
        )
  }

  cargarMedicos(desde: number = 0 ):Observable<MedicoResponse> {
    //localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/medicos?desde=${ desde }`;
    return this.http.get<MedicoResponse>( url, this.headers)      
  }

  cargarAllmedicos( ):Observable<MedicoResponse> {
    //localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/medicos/all`;
    return this.http.get<MedicoResponse>( url, this.headers)
       
        
  }

  borrarMedico( id: string ){
    console.log(id);
    const url = `${ base_url }/medicos/${ id }`;
    return this.http.delete( url, this.headers );
  }

  obtenerMedicoPorId(  medicoId:string ){ //aca role no viene como parametro (viene email y nombre en this.perfilForm.value) pero aun asi funciona ya que role simplemente se ignora
    
    console.log(medicoId);
    return this.http.put(`${ base_url }/medicos/${medicoId}`, this.headers) //Para actualizar los datos del usuario se necesita enviar al backend El id que se obtiene de un metodo get que me da el id del usuario logeado que es el mismo que esta intentando actualizar sus datos, la data que se quiere actualizar que es enviada por un formulario y los header con el token de acceso
     
  }

  editarMedico(medico: Medico): Observable<any> {
    return this.http.put(`${ base_url }/medicos/${medico.rut}`, medico, this.headers);
  }


}

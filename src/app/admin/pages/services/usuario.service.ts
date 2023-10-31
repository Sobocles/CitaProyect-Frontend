import { Injectable, OnInit } from '@angular/core';
import { Paciente, UsuariosResponse } from '../interface/paciente';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class PacienteService  {

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


  cargarPacientes():Observable<UsuariosResponse> {
    //localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/usuarios`;
    return this.http.get<UsuariosResponse>( url, this.headers)      
  }

  borrarPaciente( id: string ){
    console.log(id);
    const url = `${ base_url }/usuarios/${ id }`;
    return this.http.delete( url, this.headers );
  }

  crearPaciente( formData: Paciente  ){    
    return this.http.post<Paciente>(`${base_url}/usuarios`,formData,this.headers)

  }

  guardarUsuario(paciente: Paciente){
    console.log(paciente);
    return this.http.put(`${ base_url }/usuarios/${paciente.rut}`, paciente, this.headers);
  }

}

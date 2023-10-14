import { Injectable, OnInit } from '@angular/core';
import { Paciente } from '../interface/paciente';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

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
      'x-token': this.token //ESTE ES EL GET TOKEN
      }
    }
  }

  constructor( private http: HttpClient) { }


  cargarPacientes() {
    //localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/usuarios`;
    return this.http.get<Paciente[]>( url, this.headers)      
  }

  borrarPaciente( id: string ){
    console.log(id);
    const url = `${ base_url }/usuarios/${ id }`;
    return this.http.delete( url, this.headers );
  }

  crearPaciente( formData: Paciente  ){    
    return this.http.post<Paciente>(`${base_url}/usuarios`,formData)

  }

}

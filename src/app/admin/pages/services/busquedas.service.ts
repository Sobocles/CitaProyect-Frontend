import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environment/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

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

  buscar(tipo: 'medicos' | 'usuarios' | 'horario_medico' | 'tipo_cita' | 'cita_medica' | 'facturas'| 'cita_medico', termino: string) {
    const url = `${base_url}/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
        .pipe(
            map((resp: any) => {
                switch (tipo) {
                    case 'medicos':
                        return resp.citas;
                    case 'usuarios':
                        return resp.citas;
                    case 'horario_medico':
                        return resp.citas;
                    case 'tipo_cita':
                        return resp.citas; 
                    case 'cita_medica':
                        return resp;
                        case 'facturas':
                          return resp; 
                          case 'cita_medico':
                            return resp; 
                    default:
                        return [];
                }
            })
        );
}

cargarMedicos() {
  //localhost:3000/api/usuarios?desde=0
  const url = `${ base_url }/busqueda_cita`;
  return this.http.get( url, this.headers)
     
      
}






}

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

  buscar(tipo: 'medicos' | 'usuarios' | 'horario_medico' | 'tipo_cita' | 'cita_medica', termino: string) {
    const url = `${base_url}/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
        .pipe(
            map((resp: any) => {
                switch (tipo) {
                    case 'medicos':
                        return resp.resultados;
                    case 'usuarios':
                        return resp.resultados;
                    case 'horario_medico':
                        return resp.resultados;
                    case 'tipo_cita':
                        return resp.resultados; // Asumiendo que la respuesta para 'tipo_cita' tiene una clave 'resultados' (puede necesitar ajuste si no es así).
                    case 'cita_medica':
                        return resp.resultados; // Asumo que la respuesta para 'cita_medica' tiene una clave 'citas', basándome en el ejemplo que diste anteriormente.
                    default:
                        return [];
                }
            })
        );
}






}

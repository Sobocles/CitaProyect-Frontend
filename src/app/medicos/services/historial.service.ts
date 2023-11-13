import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Historial, HistorialResponse } from '../historial';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

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

  cargarHistorial(desde: number = 0):Observable<HistorialResponse> {
    const url = `${base_url}/historial`;
    return this.http.get<HistorialResponse>(url, this.headers);
  }

  crearHistorial(historial: Historial) {
    const url = `${base_url}/historial`; // Asumo que la ruta es '/historial' pero puedes ajustarla si es diferente
    return this.http.post(url, historial, this.headers);
  }

  obtenerHistorialPorId(rutPaciente: string, desde: number, limite: number = 5): Observable<HistorialResponse> { 
    const url = `${ base_url }/historial/${rutPaciente}?desde=${desde}&limite=${limite}`;
    return this.http.get<HistorialResponse>(url, this.headers); 
}

}

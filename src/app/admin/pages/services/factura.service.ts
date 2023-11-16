import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

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

  constructor(private http: HttpClient) { }

  cargarAllFactura( ) {
    //localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/mercadoPago/factura`;
    return this.http.get( url, this.headers)
       
        
  }
  obtenerFacturaPorId(  id : string ){ //aca role no viene como parametro (viene email y nombre en this.perfilForm.value) pero aun asi funciona ya que role simplemente se ignora
    
    console.log('aqui llega el id',id);
    return this.http.get(`${ base_url }/mercadoPago/factura/${id}`, this.headers) //Para actualizar los datos del usuario se necesita enviar al backend El id que se obtiene de un metodo get que me da el id del usuario logeado que es el mismo que esta intentando actualizar sus datos, la data que se quiere actualizar que es enviada por un formulario y los header con el token de acceso
     
  }

  borrarFactura( id: number ){
    console.log(id);
    const url = `${ base_url }/factura/${ id }`;
    return this.http.delete( url, this.headers );
  }

}

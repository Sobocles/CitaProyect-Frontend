import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { LoginForm } from '../interfaces/login-form.interface';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  constructor( private http: HttpClient) { }

  login( usuario: string, password: string ){ //formData es un objeto que tiene el tipo LoginForm definido en la interfaz y donde vienen el email y el password
    const body = {
      usuario,
      password
    };
    return this.http.post(`${base_url}/login`,body) // IMPORTANTE!! EN ESTE CASO LA RESPUESTA SERIA EL OK:TRUE Y EL TOKEN
        .pipe(                                           //El operador pipe() es una función que permite encadenar una serie de operaciones sobre un flujo de datos (en este caso, los datos devueltos por la solicitud HTTP)
          tap( (resp: any) => { 
                            //el tap() permite interceptar esos datos para realizar una acción específica (en este caso, almacenar el token en el localStorage).
              //La operación tap() se utiliza para almacenar el valor del token en el localStorage del navegador. El token se obtiene a partir de la respuesta (resp) que se recibe de la solicitud HTTP y se almacena con la llave 'token'.
            
          })
        )
  }




}

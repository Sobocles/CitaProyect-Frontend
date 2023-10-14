import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

import { RegisterForm } from '../interfaces/register-form.register';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  guardarLocalStorage( token: string ) {
    localStorage.setItem('token', token );
  }

  constructor( private http: HttpClient) { }

  login( email: string, password: string ){ //formData es un objeto que tiene el tipo LoginForm definido en la interfaz y donde vienen el email y el password
    const body = {
      email,
      password
    };
    return this.http.post(`${base_url}/login`,body) // IMPORTANTE!! EN ESTE CASO LA RESPUESTA SERIA EL OK:TRUE Y EL TOKEN
        .pipe(                                           //El operador pipe() es una función que permite encadenar una serie de operaciones sobre un flujo de datos (en este caso, los datos devueltos por la solicitud HTTP)
          tap( (resp: any) => { 
            console.log(resp);
            this.guardarLocalStorage(resp.token)
          })
        )
  }
  //http://localhost:3006/api
  crearUsuario( formData: RegisterForm  ): Observable<RegisterForm>{
    console.log('creando usuario')    
    return this.http.post<RegisterForm>(`${base_url}/usuarios`,formData)
        .pipe(
            tap( (resp:any) => { 
             
              this.guardarLocalStorage(resp.token);
            })
        )
  }

  

  




}

import { Component, OnInit } from '@angular/core';
// Importa otras clases si es necesario

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  

  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]], // Cambia 'usuario' a 'username'
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    // No es necesario lanzar un error aquí
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  login() {
    console.log(this.miFormulario.value);
    const { password, username } = this.miFormulario.value;
    this.authService.login(username, password)
    .subscribe( resp => {
     
       //SE GUARDA EL EMAIL EN EL LOCAL STORAGE CON EL NOMBRE EMAIL
     

    // Navegar al Dashboard
    this.router.navigateByUrl('/');
    
    }, (err) => {
    //Si sucede un error
    //console.log(err);
    Swal.fire('Error', err.error.msg, 'error');
 
//console.log(this.loginForm.value)
//this.router.navigateByUrl('/');
});
  }
  
}

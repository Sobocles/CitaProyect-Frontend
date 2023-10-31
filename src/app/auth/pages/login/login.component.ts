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
    email: ['', [Validators.required, Validators.email]], // Cambia 'username' a 'email'
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    // No es necesario lanzar un error aquí
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
//gestionar-pacientes
login() {
  const { password, email } = this.miFormulario.value;

  this.authService.login(email, password)
    .subscribe(resp => {
      console.log(resp);
      if (resp.userOrMedico.rol === 'ADMIN_ROLE') {
        this.router.navigateByUrl('/gestionar-pacientes');
      } else if (resp.userOrMedico.rol === 'USER_ROLE') {
        this.router.navigateByUrl('/Agendar-cita');
      } else if (resp.userOrMedico.rol === 'MEDICO_ROLE') { // Verificar si el rol es MEDICO_ROLE
        this.router.navigateByUrl('/gestionar-historiales'); // Redirigir a gestionar-historiales
      } else {
        console.error('Rol de usuario no reconocido');
        // Opcionalmente, puedes manejar un caso por defecto, como redirigir al inicio o mostrar un error
        // this.router.navigateByUrl('/ruta-por-defecto');
      }
    });
}


  
}

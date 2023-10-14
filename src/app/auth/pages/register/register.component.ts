import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {
    this.miFormulario = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  registrar() {
    if (this.miFormulario.valid) {
      const formData = this.miFormulario.value;
      console.log(formData);

      // Llama al servicio AuthService para crear el usuario
      this.AuthService.crearUsuario(formData).subscribe(
        (respuesta) => {
           // Navegar al Dashboard ya que el registro fue EXITOSO!!
           console.log(respuesta);
        this.router.navigateByUrl('/');
        
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error'); //al incluir err.error.msg se Accede al mensaje de error incluido en el backenend en caso de que el correo ya este registrado
      } );
    } 
  }

}

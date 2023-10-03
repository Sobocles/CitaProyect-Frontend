import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
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
      // Los datos del formulario son válidos, puedes enviarlos al servidor aquí
      const formData = this.miFormulario.value;
      console.log(formData);
      // Envía los datos al servidor o realiza las acciones necesarias
    } else {
      // El formulario no es válido, muestra errores o mensajes de validación
    }
  }

}

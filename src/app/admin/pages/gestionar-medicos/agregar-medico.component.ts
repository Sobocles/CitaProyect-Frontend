import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.scss']
})
export class AgregarMedicoComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.pattern(/^[0-9]*$/)], // Solo números
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(0)]],
      direccion: [''],
      especialidad: [''],
      titulos: [''],
      nacionalidad: [''],
    });
  }

  enviar() {
    if (this.formulario.valid) {
      // Envía los datos
      console.log(this.formulario.value);
    } else {
      // El formulario no es válido, muestra un mensaje o realiza alguna acción
      // para indicar que se deben corregir los campos.
    }
  }

}

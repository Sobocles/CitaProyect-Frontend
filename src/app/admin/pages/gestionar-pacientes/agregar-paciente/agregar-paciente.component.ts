import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.scss']
})
export class AgregarPacienteComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: [''],
      telefono: ['', Validators.pattern(/^[0-9]*$/)],
      genero: ['masculino'], // Valor predeterminado a 'masculino', puedes cambiarlo según tus necesidades
      direccion: [''],
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

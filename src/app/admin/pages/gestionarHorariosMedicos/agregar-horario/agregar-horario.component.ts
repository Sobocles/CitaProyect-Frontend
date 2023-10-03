import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-horario-medico',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.scss']
})
export class AgregarHorarioMedicoComponent {
  horarioMedicoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.horarioMedicoForm = this.formBuilder.group({
      nombreDia: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      intervaloCitas: ['', [Validators.required, Validators.min(1)]],
      inicioColacion: [''],
      finColacion: ['']
    });
  }

  guardarHorario() {
    if (this.horarioMedicoForm.valid) {
      // Realiza la lógica para guardar el horario médico
      console.log(this.horarioMedicoForm.value);
    } else {
      // El formulario no es válido, muestra un mensaje o realiza alguna acción
      // para indicar que se deben corregir los campos.
    }
  }
}

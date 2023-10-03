import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-tipos-citas',
  templateUrl: './agregar-tipo-cita.component.html',
  styleUrls: ['./agregar-tipo-cita.component.scss']
})
export class GestionarTiposCitasComponent {
  tiposCitasForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.tiposCitasForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
  }

  guardarTipoCita() {
    if (this.tiposCitasForm.valid) {
      // Aquí puedes realizar la lógica para guardar el tipo de cita
      console.log(this.tiposCitasForm.value);
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o
      // realizar alguna acción para indicar que se deben corregir los campos.
    }
  }
}

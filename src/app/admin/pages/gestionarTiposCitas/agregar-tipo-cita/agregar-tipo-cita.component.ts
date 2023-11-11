import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCitaService } from '../../services/tipo-cita.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Tipo_cita, tipoCitaResponse } from '../../interface/tipoCita';


@Component({
  selector: 'app-agregar-tipo-cita',
  templateUrl: './agregar-tipo-cita.component.html',
  styleUrls: ['./agregar-tipo-cita.component.scss']
})
export class AgregarTipoCitaComponent {

  formularioTipoCita: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private TipoCitaService: TipoCitaService
  ) {
    this.formularioTipoCita = this.fb.group({
      tipo_cita: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      especialidad_medica: ['', Validators.required],
      duracion_cita: ['', [Validators.required, Validators.pattern(/^\d+$/)]],

    });
  }

  crearTipoCita() {
    if (this.formularioTipoCita.valid) {
      const formData: Tipo_cita = this.formularioTipoCita.value;

      // Convertir duracion_cita a número
     
      console.log(formData);
      this.TipoCitaService.crearTipoCita(formData).subscribe(
        (respuesta: tipoCitaResponse) => {
          console.log(respuesta);
          Swal.fire('Mensaje', 'Registro exitoso', 'success');
          this.router.navigateByUrl('/gestionar-tipo-cita');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete el formulario correctamente', 'error');
    }
  }

  
  
}



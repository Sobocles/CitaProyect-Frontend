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
      precio: ['', [Validators.required, Validators.pattern(/^(?!0\d)\d+$/)]],
      especialidad_medica: ['', Validators.required],
      duracion_cita: ['', [
        Validators.required, 
        Validators.pattern(/^\d+$/),
        Validators.max(180)  // Asegurarse de que la duración no sea mayor a 180 minutos
      ]]

    });
  }

  convertirMinutosAHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas} hora(s) y ${minutosRestantes} minuto(s)`;
  }
  

  crearTipoCita() {
    if (this.formularioTipoCita.invalid) {
      // Marca todos los controles del formulario como tocados
      this.formularioTipoCita.markAllAsTouched();
      Swal.fire('Error', 'Por favor, complete el formulario correctamente', 'error');
      return;
    }
  
    const formData: Tipo_cita = this.formularioTipoCita.value;
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
  }
  

  
  
}



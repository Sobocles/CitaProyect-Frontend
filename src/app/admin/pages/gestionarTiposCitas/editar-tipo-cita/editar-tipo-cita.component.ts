import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoCitaService } from '../../services/tipo-cita.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-cita',
  templateUrl: './editar-tipo-cita.component.html',
  styleUrls: ['./editar-tipo-cita.component.scss']
})
export class EditarTipoCitaComponent implements OnInit {

  formularioTipoCita: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private TipoCitaService: TipoCitaService,  private activatedRoute: ActivatedRoute
  ) {
    this.formularioTipoCita = this.fb.group({
      idTipo: [],
      tipo_cita: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      especialidad_medica: ['', Validators.required],
      duracion_cita: ['', [Validators.required, Validators.pattern(/^\d+$/)]],

    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const tipoCitaId = params['id'];
      console.log('AQUI ESTA EL ID DEL TIPO DE CITA',tipoCitaId);
        if (tipoCitaId) {
          console.log('AQUI ESTA EL ID DEL TIPO DE CITA 2',tipoCitaId);
          this.TipoCitaService.obtenerTipoCitaId(tipoCitaId).subscribe((response: any) => {
            console.log('AQUI ESTA LA RESPUESTA',response);
            const tipoCita = response.medico;
            console.log('AQUI ESTA LA RESPUESTA TIPO CITA',tipoCita);
            this.formularioTipoCita.patchValue({
              idTipo: tipoCita.idTipo,
              tipo_cita: tipoCita.tipo_cita,
              precio: tipoCita.precio,
              especialidad_medica: tipoCita.especialidad_medica,
          
            });
          });
        }
      

    });
  }

  editarTipoCita() {
    Swal.fire({
      title: '¿Editar Tipo de cita?',
      text: 'Esta a punto de editar los datos del tipo de cita. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
       
          const medicoEditado = this.formularioTipoCita.value;
          this.TipoCitaService.editarTipoCita(medicoEditado).subscribe(
            (response) => {
              Swal.fire('Éxito', 'Tipo cita editado exitosamente', 'success');
              this.router.navigateByUrl('/gestionar-tipo-cita');
            },
            (error) => {
              Swal.fire('Error', 'Hubo un error al editar el tipo cita', 'error');
              // Manejar errores, como mensajes de error o reversiones de cambios en el formulario.
            }
          );
        }
      }
   );
  }

  
}

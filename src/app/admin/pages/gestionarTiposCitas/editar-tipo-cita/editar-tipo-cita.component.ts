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
      idTipo: ['', [ ]],
      precio: ['', [Validators.required, Validators.pattern(/^(?!0\d)\d+$/)]],
      
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

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const tipoCitaId = params['id'];
     
 
        if (tipoCitaId) {
    
          this.TipoCitaService.obtenerTipoCitaId(tipoCitaId).subscribe((response: any) => {
            console.log('AQUI ESTA LA RESPUESTA',response);
            const tipoCita = response.medico;
            console.log('AQUI ESTA LA RESPUESTA TIPO CITA',tipoCita);
            this.formularioTipoCita.patchValue({
              idTipo: tipoCita.idTipo,
              tipo_cita: tipoCita.tipo_cita,
              precio: tipoCita.precio,
             
          
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
       
          const tipocitaEditado = this.formularioTipoCita.value;
    
          this.TipoCitaService.editarTipoCita(tipocitaEditado).subscribe(
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

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Medico } from '../../interface/medicos';
import { Router } from '@angular/router';
import { HorarioMedicoService } from '../../services/horario-medico.service';
import { ActivatedRoute } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.scss']
})
export class EditarHorarioComponent implements OnInit {

  horarioMedicoForm: FormGroup;

  medicos: Medico[] = [];



  constructor(private fb: FormBuilder,  private HorarioMedicoService: HorarioMedicoService, private router: Router, private route: ActivatedRoute, private MedicoService: MedicoService ) {
    this.horarioMedicoForm = this.fb.group({
      idHorario: [''],
      diaSemana: ['', [Validators.required]],
      horaInicio: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      horaFinalizacion: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
    
      inicio_colacion: ['',Validators.required],
      fin_colacion: ['',Validators.required],
     
    }, { validators: this.horarioColacionValidator() });
  }

  horarioColacionValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control instanceof FormGroup)) return null;
  
      const inicio = control.get('horaInicio')?.value;
      const fin = control.get('horaFinalizacion')?.value;
      const inicioColacion = control.get('inicio_colacion')?.value;
      const finColacion = control.get('fin_colacion')?.value;
  
      if (!inicio || !fin || !inicioColacion || !finColacion) {
        return null;
      }
  
      // Validar que horaInicio es anterior a horaFinalizacion
      if (inicio >= fin) {
        return { horarioLaboralInvalido: true };
      }
  
      // Validar que la colación está dentro del horario laboral
      if (inicio > inicioColacion || finColacion > fin) {
        return { horarioColacionFuera: true };
      }
  
      // Validar que inicioColacion es anterior a finColacion
      if (inicioColacion >= finColacion) {
        return { colacionInvalida: true };
      }
  
      return null;
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const horarioId = params['id'];
      if (horarioId) {
        // Obténer los datos del médico y llénalos en el formulario
        this.HorarioMedicoService.obtenerHorarioPorId(horarioId).subscribe((response: any) => {
          const horario = response.horario;
          console.log('aqui estan los horarios medicos',horario);
          this.horarioMedicoForm.patchValue({
            idHorario: horario.idHorario,
            horaInicio: horario.horaInicio,
            horaFinalizacion: horario.horaFinalizacion,
            inicio_colacion: horario.inicio_colacion,
            fin_colacion: horario.fin_colacion,
            duracionCitas: horario.duracionCitas,
            disponibilidad: horario.disponibilidad,
            fechaCreacion: horario.fechaCreacion,
          });
        });
      }

    });
  }

  cargaMedicos() {
    this.MedicoService.cargarMedicos()
      .subscribe((response: any) => { 
        this.medicos = response.medicos; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
        console.log(this.medicos);
      });
  }

  editarHorario() {
    Swal.fire({
      title: '¿Editar Horario?',
      text: 'Esta a punto de editar el horario del médico. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
      
          const medicoEditado = this.horarioMedicoForm.value;
          console.log('AQUI ESTA EL MEDICO EDITADO',medicoEditado);
          this.HorarioMedicoService.editarHorario(medicoEditado).subscribe(
            (response) => {
              Swal.fire('Éxito', 'Médico editado exitosamente', 'success');
              this.router.navigateByUrl('/gestionar-horarios-medicos');
            },
            (error) => {
              Swal.fire('Error', 'Hubo un error al editar el médico', 'error');
              // Manejar errores, como mensajes de error o reversiones de cambios en el formulario.
            }
          );
        }
      }
    );
  }
}

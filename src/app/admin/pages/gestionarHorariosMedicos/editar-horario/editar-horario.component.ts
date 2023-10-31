import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  disponibilidadOpciones = [
    { valor: 'disponible', etiqueta: 'Disponible' },
    { valor: 'ocupado', etiqueta: 'Ocupado' }
  ];

  constructor(private fb: FormBuilder,  private HorarioMedicoService: HorarioMedicoService, private router: Router, private route: ActivatedRoute, private MedicoService: MedicoService ) {
    this.horarioMedicoForm = this.fb.group({
      diaSemana: ['', [Validators.required]],
      horaInicio: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      horaFinalizacion: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      hora_inicio_colacion: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      hora_fin_colacion: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      duracionCitas: [null, [Validators.required, Validators.min(1)]],
      rut_medico: ['', [Validators.required, Validators.pattern(/^(\d{1,3}(?:\.\d{3}){2}-[\dkK])$/)]],
      disponibilidad: [],
      fechaCreacion: [null, [Validators.required]],
    });
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      const horarioId = params['id'];
      if (horarioId) {
        // Obtén los datos del médico y llénalos en el formulario
        this.HorarioMedicoService.obtenerHorarioPorId(horarioId).subscribe((response: any) => {
          const horario = response.horario;
          console.log(horario);
          this.horarioMedicoForm.patchValue({
            diaSemana: horario.diaSemana,
            horaInicio: horario.horaInicio,
            horaFinalizacion: horario.horaFinalizacion,
            hora_inicio_colacion: horario.hora_inicio_colacion,
            hora_fin_colacion: horario.hora_fin_colacion,
            duracionCitas: horario.duracionCitas,
            rut_medico: this.cargaMedicos(),
            disponibilidad: horario.disponibilidad,
            fechaCreacion: horario.fechaCreacion,
          });
        });
      }

    });
  }

  cargaMedicos() {
    this.MedicoService.cargarMedicos()
      .subscribe((response: any) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
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
        if (this.horarioMedicoForm.valid) {
          const medicoEditado = this.horarioMedicoForm.value;
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
    });
  }
}

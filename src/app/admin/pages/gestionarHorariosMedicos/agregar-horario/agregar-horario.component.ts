import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../interface/medicos';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HorarioMedico, HorarioResponse } from '../../interface/horarioMedico';
import { HorarioMedicoService } from '../../services/horario-medico.service';

@Component({
  selector: 'app-agregar-horario-medico',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.scss']
})
export class AgregarHorarioMedicoComponent implements OnInit {
  horarioMedicoForm: FormGroup;

  medicos: Medico[] = [];

  disponibilidadOpciones = [
    { valor: 'disponible', etiqueta: 'Disponible' },
    { valor: 'ocupado', etiqueta: 'Ocupado' }
  ];

  constructor(private fb: FormBuilder, private MedicoService: MedicoService, private HorarioMedicoService: HorarioMedicoService, private router: Router) {
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
  ngOnInit(): void {
    this.cargaMedicos();
  }



  cargaMedicos() {
    this.MedicoService.cargarMedicos()
      .subscribe((response: any) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.medicos = response.medicos; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
        console.log(this.medicos);
      });
  }

  crearHorario() {
    const formData = this.horarioMedicoForm.value;
    console.log(formData);

    this.HorarioMedicoService.crearHorario(formData).subscribe(
      (respuesta:any) => {
         // Navegar al Dashboard ya que el registro fue EXITOSO!!
         console.log(respuesta);
         Swal.fire('Mensaje', respuesta, 'success');
      this.router.navigateByUrl('/gestionar-horarios-medicos');
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error'); //al incluir err.error.msg se Accede al mensaje de error incluido en el backenend en caso de que el correo ya este registrado
    } );
  }

}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CitaMedicaService } from '../../services/cita-medica.service';
import { CitasResponse } from '../../interface/cita_medica';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../services/usuario.service';
import { MedicoService } from '../../services/medico.service';
import { TipoCitaService } from '../../services/tipo-cita.service';
import { MedicoResponse } from '../../interface/medicos';
import { UsuariosResponse } from '../../interface/paciente';
import { tipoCitaResponse } from '../../interface/tipoCita';
import { HorarioMedicoService } from '../../services/horario-medico.service';
import { CitasResponsex } from '../../interface/cita_medicaResponse';

export interface Especialidad {
  especialidad_medica: string;
}


@Component({
  selector: 'app-agregar-cita-medica',
  templateUrl: './agregar-cita-medica.component.html',
  styleUrls: ['./agregar-cita-medica.component.scss']
})
export class AgregarCitaMedicaComponent implements OnInit {
  
        motivo: string = '';
        formulario!: FormGroup;
        public pacientes: any[] = [];
      public medicos: any[] = [];
      public tiposCita: any[] = [];
      horaInicio: string = '';
      horaFin: string = '';

      tiposCitax = ['Consulta general', 'Especialidad médica'];
      selectedTipoCita!: string;
      especialidades: Especialidad[] = [];
      selectedEspecialidad: string = '';  // Asegúrate de que sea una cadena vacía

      selectedDate!: string; // Cambia 'Date' a 'string'
        // Asegúrate de que el tipo sea el correcto.
      medicosDisponibles: any[] = [];
      selectedMedico: any;
      selectedPaciente: string = ''; 
      idTipo!: number;




  constructor(private fb: FormBuilder, private citaMedicaService: CitaMedicaService, private router: Router, private PacienteService: PacienteService, private TipoCitaService: TipoCitaService, private MedicoService: MedicoService, private HorarioMedicoService: HorarioMedicoService) { }

  ngOnInit(): void {
    this.formulario= this.fb.group({
      motivo: ['', [Validators.required]],
      rut_paciente: ['', [Validators.required]],
      rut_medico: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idTipoCita: ['', [Validators.required]],
    });
    this.selectedMedico = {};
   this.cargaMedicos();
   this.cargaPacientes();
    this.cargaTipocita();
    this.cargaEspecialidades();
  }

  onMedicoSelected(event: any): void {
    // Si estás usando [(ngModel)] no necesitas tomar el valor del evento
    // ya que `selectedMedico` será actualizado automáticamente con el objeto médico seleccionado.
    // Solo actualiza los otros valores basados en `selectedMedico` que ya tiene el valor correcto.
    console.log('AQUI ESTA EL MEDICO SELECCIONADO',this.selectedMedico);
    if (this.selectedMedico) {
      this.horaInicio = this.selectedMedico.hora_inicio;
      this.horaFin = this.selectedMedico.hora_fin;
      this.idTipo = this.selectedMedico.idTipoCita;
    }
  }
  


  guardarCita() {
    console.log('PACIENTE',this.selectedPaciente);
    console.log('FECHA',this.selectedDate);
    console.log('HORA_INICIO',this.horaInicio);
    console.log('selectedMedico',this.horaInicio);

    
  
    const nuevaCita: CitasResponsex = {
      cita: {
        idCita: 0,
        motivo: this.motivo,
        fecha: this.selectedDate,
        hora_inicio: this.horaInicio,
        hora_fin: this.horaFin,
        rut_paciente: this.selectedPaciente,  // Modificado para ser una cadena directamente
        rut_medico: this.selectedMedico.rutMedico,      // Modificado para ser una cadena directamente
        tipo_cita: this.selectedTipoCita,  // Modificado el nombre de la propiedad a 'tipo_cita'
        idTipoCita: this.idTipo,
        estado: 'en_curso'   
      }
    };
    console.log(nuevaCita);

    this.citaMedicaService.crearCitaMedica(nuevaCita).subscribe(
      response => {
        Swal.fire('Exito', 'Cita creada exitosamente!', 'success');
        this.router.navigateByUrl('/gestionar-cita');
      },
      error => {
        Swal.fire('Error', 'Hubo un error al guardar la cita', 'error');
      }
    );
  }
  
  onTipoCitaChange(event: any) {
    if (event.target.value === 'Especialidad médica') {
      this.cargaEspecialidades();
    } else {
      this.onChangeData();  // Llama a onChangeData cuando se selecciona "Consulta general"
    }
  }
  

  onChangeData() {
    console.log('onChangeData fue llamada');
    console.log('selectedTipoCita:', this.selectedTipoCita);
    console.log('selectedEspecialidad:', this.selectedEspecialidad);
    console.log('selectedDate:', this.selectedDate);
    console.log('selectedMedico',this.selectedMedico);


    this.motivo = '';
    this.medicosDisponibles = [];

    // Si es una consulta general, no añadir el campo de especialidad
    if (this.selectedTipoCita === 'Especialidad médica' && this.selectedEspecialidad) {
        this.motivo = this.selectedEspecialidad;
    } else {
        this.motivo = 'Consulta general';
    }

    let formData: any = {
        fecha: this.selectedDate,
        especialidad: this.motivo  // Aquí asignamos motivo a formData independientemente de la condición anterior
    };

    console.log('este es el motivo', this.motivo);

    if (this.selectedDate) {
        console.log('ESTE ES', this.selectedDate);

        this.HorarioMedicoService.buscarHorarioDisponible(formData).subscribe(
            (response) => {
                this.medicosDisponibles = response.bloques;
                console.log('ARRAY DE MEDICOS DISPONIBLES',this.medicosDisponibles)
                this.medicosDisponibles.forEach((medico) => {
                  console.log('RUT del médico:', medico.rutMedico);
                });
                
           
                if (this.medicosDisponibles.length === 0) {
                    Swal.fire('Información', 'No hay médicos disponibles para la fecha seleccionada.', 'info');
                }
            },
            (error) => {
                console.error('Error obteniendo médicos disponibles:', error);
                Swal.fire('Error', 'Error obteniendo médicos disponibles', 'error');
            }
        );
    }
}

  





  cargaEspecialidades() {
    this.TipoCitaService.cargaEspecialidades().subscribe(data => {
      console.log(data)
      this.especialidades = data.especialidades;
    });
  }



  cargaMedicos() {
    this.MedicoService.cargarMedicos()
      .subscribe((response: MedicoResponse) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.medicos = response.medicos; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'

      });
  }

  cargaTipocita() {
    this.TipoCitaService.cargaTipocita()
      .subscribe((response: tipoCitaResponse) => {
        console.log(response);
        this.tiposCita = response.tipo_cita; // Asigna el arreglo tipo_cita de la respuesta a tiposCitas

      });
  }

  cargaPacientes() {
    this.PacienteService.cargarAllPacientes()
      .subscribe((response: UsuariosResponse) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        console.log('aqui esta la respuesta',response);
        this.pacientes = response.usuarios // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
        console.log('aqui estan los pacientes',this.pacientes);
      });
  }

}

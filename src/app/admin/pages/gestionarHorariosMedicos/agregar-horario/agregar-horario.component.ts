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
  // En tu componente TypeScript
 

  medicos: Medico[] = [];



  constructor(private fb: FormBuilder, private MedicoService: MedicoService, private HorarioMedicoService: HorarioMedicoService, private router: Router) {
    this.horarioMedicoForm = this.fb.group({
      diaSemana: ['', [Validators.required]],
      horaInicio: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      horaFinalizacion: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
    
      rut_medico: ['', [Validators.required]],
    
  
    });
  }
  ngOnInit(): void {
    this.cargaMedicos();
  }



  cargaMedicos() {
    this.MedicoService.cargarmedicosEspecialidad()
      .subscribe((response: any) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.medicos = response.medicos; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
        console.log(this.medicos);
      });
  }

  crearHorario() {
    const formData = this.horarioMedicoForm.value;
    console.log(formData);
  
    this.HorarioMedicoService.crearHorario(formData).subscribe(
      (respuesta: any) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Horario Creado',
          text: 'El horario médico ha sido creado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          // Navegar al Dashboard después de cerrar el SweetAlert
          if (result.isConfirmed) {
            this.router.navigateByUrl('/gestionar-horarios-medicos');
          }
        });
      },
      (err) => {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error al Crear Horario',
          text: err.error.msg, // Mensaje de error del backend
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
  

}

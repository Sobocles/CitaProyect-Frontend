import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';
import { Paciente } from '../interface/paciente';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestionar-pacientes',
  templateUrl: './gestionar-pacientes.component.html',
  styleUrls: ['./gestionar-pacientes.component.scss']
})
export class GestionarPacientesComponent implements OnInit {
  
  pacientes: Paciente [] = [];

  constructor(private PacienteService: PacienteService, private router: Router){}

  ngOnInit(){
    this.cargaPacientes();
  }


  cargaPacientes() {
    this.PacienteService.cargarPacientes()
      .subscribe((response: any) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.pacientes = response.usuarios; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
        console.log(this.pacientes);
      });
  }

  borrarPaciente( paciente: Paciente ) {

    Swal.fire({
      title: '¿Borrar paciente?',
      text: `Esta a punto de borrar a ${ paciente.nombre } tenga en cuenta que se eliminaran los historiales en los que el`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.PacienteService.borrarPaciente( paciente.rut )
          .subscribe( resp => {
            
            this.cargaPacientes();
            Swal.fire(
              'Paciente borrado',
              `${ paciente.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }


}

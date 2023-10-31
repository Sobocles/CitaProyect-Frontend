import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { Paciente, UsuariosResponse } from '../interface/paciente';
import Swal from 'sweetalert2';
import { BusquedasService } from '../services/busquedas.service';

@Component({
  selector: 'app-gestionar-pacientes',
  templateUrl: './gestionar-pacientes.component.html',
  styleUrls: ['./gestionar-pacientes.component.scss']
})
export class GestionarPacientesComponent implements OnInit {
  
  pacientes: Paciente [] = [];

  constructor(private PacienteService: PacienteService, private router: Router, private BusquedasService: BusquedasService){}

  ngOnInit(){
    this.cargaPacientes();
  }


  cargaPacientes() {
    this.PacienteService.cargarPacientes()
      .subscribe((response: UsuariosResponse) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.pacientes = response.usuarios // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
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

  cambiarRole( paciente: Paciente ){

    this.PacienteService.guardarUsuario(paciente)
    .subscribe( resp => {
      console.log(resp);
    })
  }
  buscar(termino: string): void {
    console.log(termino);
    if (termino.length === 0) {
        return; // Termina la ejecución si no hay término a buscar
    }

    this.BusquedasService.buscar('usuarios', termino)
    .subscribe(resp => {
      console.log("Respuesta completa:", resp);
      this.pacientes = resp; // Cambio aquí: asigna directamente resp
      console.log("this.pacientes después de asignar:", this.pacientes);
    });           
}




}

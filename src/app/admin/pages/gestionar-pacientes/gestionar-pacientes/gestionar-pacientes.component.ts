import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Paciente, UsuariosResponse } from '../../interface/paciente';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-gestionar-pacientes',
  templateUrl: './gestionar-pacientes.component.html',
  styleUrls: ['./gestionar-pacientes.component.scss']
})
export class GestionarPacientesComponent implements OnInit {
  
  pacientes: Paciente [] = [];
  public desde: number = 0;
  public totalUsuarios: number = 0;

  constructor(private PacienteService: PacienteService, private router: Router, private BusquedasService: BusquedasService){}

  ngOnInit(){
    this.cargaPacientes();
  }


  cargaPacientes() {
    this.PacienteService.cargarPacientes(this.desde)
      .subscribe((response: UsuariosResponse) => { 
        this.totalUsuarios = response.total,
        this.pacientes = response.usuarios 

      });
  }

  borrarPaciente( paciente: Paciente ) {

    Swal.fire({
      title: '¿Borrar paciente?',
      text: `Esta a punto de borrar a ${ paciente.nombre } tenga en cuenta que se eliminaran los historiales y citas medicas en los que el paciente este registrado`,
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

editarUsuario(usuario: Paciente) {
  console.log('este paciente',usuario);
  this.router.navigate(['/editar-usuario', usuario.rut]);
}

/*
    cambiarPagina( valor: number ) { 
    this.desde +=valor;

    if( this.desde < 0){
      this.desde = 0;
    } else if( this.desde >= this.totalUsuarios ){ 
      this.desde -= valor;
    }
    this.cargaMedicos(); 
  }
*/

    cambiarPagina( valor: number ) {
      console.log(valor);
      this.desde +=valor;

      if( this.desde < 0){
        this.desde = 0;
      } else if( this.desde >= this.totalUsuarios ){ 
        this.desde -= valor;
      }
      this.cargaPacientes();

    }



}

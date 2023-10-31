import { Component, OnInit } from '@angular/core';
import { Medico, MedicoResponse } from '../interface/medicos';
import { MedicoService } from '../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusquedasService } from '../services/busquedas.service';
import { TipoCitaService } from '../services/tipo-cita.service';


@Component({
  selector: 'app-gestionar-medicos',
  templateUrl: './gestionar-medicos.component.html',
  styleUrls: ['./gestionar-medicos.component.scss']
})


export class GestionarMedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public desde: number = 0;
  public totalUsuarios: number = 0;

 

  constructor(private MedicoService: MedicoService, private router: Router, private BusquedasService: BusquedasService){}
  ngOnInit(){
    this.cargaMedicos();
  }

  cargaMedicos() {
    this.MedicoService.cargarMedicos(this.desde)
      .subscribe((response: MedicoResponse) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.totalUsuarios = response.totalMedicos;
        this.medicos = response.medicos; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'

      });
  }

  

  borrarMedico( medico: Medico ) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ medico.nombre } tenga en cuenta que se eliminaran horarios y citas en las que el medico este involucrado`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.MedicoService.borrarMedico( medico.rut )
          .subscribe( resp => {
            
            this.cargaMedicos();
            Swal.fire(
              'Médico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

  editarMedico(medico: Medico) {
 
    this.router.navigate(['/editar-medico', medico.rut]);
  }

  cambiarPagina( valor: number ) { //El valor indica que cantidad de usuarios se mostraran en cada pagina (+5 para el boton suguiente, -5 para anterior)
    this.desde +=valor;
    console.log(this.desde);
    if( this.desde < 0){ //Condicion que evita que al restar -5 a desde valor a desde se obtenga un numero menor a 0
      this.desde = 0;
    } else if( this.desde >= this.totalUsuarios ){ //Condicion que evita que al sumar +5 a desde a desde se obtenga un numero menor a 0
      this.desde -= valor;
    }
    this.cargaMedicos(); //Luego de hacer las validaciones se muestran los usuarios
  }

  buscar(termino: string): void {
    console.log(termino);
    if (termino.length === 0) {
     
        return; // Termina la ejecución si no hay término a buscar
    }

    this.BusquedasService.buscar('medicos', termino)
  
    .subscribe((resp: any) => {  // Cambia el tipo a 'any' para no tener problemas con el tipado
      console.log(resp);
      this.medicos = resp;
      console.log(this.medicos);
  });           
}


}

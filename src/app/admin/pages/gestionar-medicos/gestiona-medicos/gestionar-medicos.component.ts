import { Component, OnInit } from '@angular/core';
import { Medico, MedicoResponse } from '../../interface/medicos';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';



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
      .subscribe((response: MedicoResponse) => {
        this.totalUsuarios = response.total;
      
        this.medicos = response.medicos; 

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
    console.log('este medico',medico);
    this.router.navigate(['/editar-medico', medico.rut]);
  }

      cambiarPagina( valor: number ) { 
        this.desde +=valor;

        if( this.desde < 0){ 
          this.desde = 0;
        } else if( this.desde >= this.totalUsuarios ){ 
          this.desde -= valor;
        }
        this.cargaMedicos(); 
      }

  buscar(termino: string): void {
  
    if (termino.length === 0) {
     
        return; // Termina la ejecución si no hay término a buscar
    }

    this.BusquedasService.buscar('medicos', termino)
  
    .subscribe((resp: any) => {  // Cambia el tipo a 'any' para no tener problemas con el tipado
      console.log(resp);
      this.medicos = resp;
  
  });           
}


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioMedicoService } from '../services/horario-medico.service';
import { HorarioMedico, HorarioResponse } from '../interface/horarioMedico';
import Swal from 'sweetalert2';
import { Medico } from '../interface/medicos';
import { BusquedasService } from '../services/busquedas.service';


@Component({
  selector: 'app-gestionar-horarios-medicos',
  templateUrl: './gestionar-horarios-medicos.component.html',
  styleUrls: ['./gestionar-horarios-medicos.component.scss']
})
export class GestionarHorariosMedicosComponent implements OnInit {

  public totalHorarios: number = 0;

  public horarios: HorarioMedico[] = [];

  constructor(private HorarioMedicoService: HorarioMedicoService, private router: Router, private BusquedasService: BusquedasService){}

  ngOnInit(): void {
    this.cargaHorario()
  }

  borrarHorario( horario: HorarioMedico ) {

    Swal.fire({
      title: '¿Borrar Horario?',
      text: `Esta seguro que desea eliminar este horario?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.HorarioMedicoService.borrarHorario( horario.idHorario )
          .subscribe( resp => {
            
            this.cargaHorario();
            Swal.fire(
              'Cita borradoa',
              `Cita numero ${ horario.idHorario } fue eliminada correctamente`,
              'success'
            );
            
          });

      }
    })

  }

  cargaHorario() {
    this.HorarioMedicoService.cargarHorario()
      .subscribe((response: HorarioResponse) => {
   
        this.horarios = response.horario;
      });
  }

  editarHorario(horario: HorarioMedico) {
 
    this.router.navigate(['/editar-horario', horario.idHorario]);
  }

  buscar(termino: string): void {

    if (termino.length === 0) {
     
        return; // Termina la ejecución si no hay término a buscar
    }

    this.BusquedasService.buscar('horario_medico', termino)
    .subscribe((resp: HorarioMedico[]) => {  // Cambia el tipo a HorarioMedico[] para que coincida con la estructura esperada
      this.horarios = resp;
      console.log(this.horarios);
  });  
         
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioMedicoService } from '../services/horario-medico.service';
import { HorarioMedico, HorarioResponse } from '../interface/horarioMedico';
import Swal from 'sweetalert2';
import { Medico } from '../interface/medicos';


@Component({
  selector: 'app-gestionar-horarios-medicos',
  templateUrl: './gestionar-horarios-medicos.component.html',
  styleUrls: ['./gestionar-horarios-medicos.component.scss']
})
export class GestionarHorariosMedicosComponent implements OnInit {

  public totalHorarios: number = 0;

  horarios: HorarioMedico[] = [];

  constructor(private HorarioMedicoService: HorarioMedicoService, private router: Router){}

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
              'Horario borrado',
              `Horario ${ horario.idHorario } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

  cargaHorario() {
    this.HorarioMedicoService.cargarHorario()
      .subscribe((response: HorarioResponse) => {
        console.log(response);
        this.horarios = response.horario;
      });
  }

}

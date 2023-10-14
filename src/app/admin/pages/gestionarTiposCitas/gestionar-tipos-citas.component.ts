import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCitaService } from '../services/tipo-cita.service';
import { Medico } from '../interface/medicos';
import { Tipo_cita, tipoCitaResponse } from '../interface/tipoCita';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-tipos-citas',
  templateUrl: './gestionar-tipos-citas.component.html',
  styleUrls: ['./gestionar-tipos-citas.component.scss']
})
export class GestionarTiposCitasComponent implements OnInit{

  tiposCitas: Tipo_cita[] = [];
  public desde: number = 0;
  public totalUsuarios: number = 0;

  constructor(private TipoCitaService: TipoCitaService, private router: Router){}

  ngOnInit(): void {
    this.cargaTipocita()
  }
  cargaTipocita() {
    this.TipoCitaService.cargaTipocita(this.desde)
      .subscribe((response: tipoCitaResponse) => {
        this.tiposCitas = response.tipo_cita; // Asigna el arreglo tipo_cita de la respuesta a tiposCitas
        console.log(this.tiposCitas);
      });
  }

  borrarTipoCita( tipocita: Tipo_cita ) {

    Swal.fire({
      title: '¿Borrar Horario?',
      text: `Esta seguro que desea eliminar este horario?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.TipoCitaService.borrarTipoCita( tipocita.idTipo )
          .subscribe( resp => {
            
            this.cargaTipocita()
            Swal.fire(
              'Tipo de cita borrado',
              `Tipo Cita ${ tipocita.idTipo } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }




}

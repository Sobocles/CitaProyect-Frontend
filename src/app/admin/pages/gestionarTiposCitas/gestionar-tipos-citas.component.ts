import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCitaService } from '../services/tipo-cita.service';
import { Medico } from '../interface/medicos';
import { Tipo_cita, tipoCitaResponse } from '../interface/tipoCita';
import Swal from 'sweetalert2';
import { BusquedasService } from '../services/busquedas.service';

@Component({
  selector: 'app-gestionar-tipos-citas',
  templateUrl: './gestionar-tipos-citas.component.html',
  styleUrls: ['./gestionar-tipos-citas.component.scss']
})
export class GestionarTiposCitasComponent implements OnInit{

  public tiposCitas: Tipo_cita[] = [];
  public desde: number = 0;
  public totalUsuarios: number = 0;

  constructor(private TipoCitaService: TipoCitaService, private router: Router, private BusquedasService: BusquedasService){}

  ngOnInit(): void {
    this.cargaTipocita()
  }
  cargaTipocita() {
    this.TipoCitaService.cargaTipocita(this.desde)
      .subscribe((response: tipoCitaResponse) => {
        this.tiposCitas = response.tipo_cita; // Asigna el arreglo tipo_cita de la respuesta a tiposCitas

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

  buscar(termino: string): void {

    if (termino.length === 0) {
     
        return; // Termina la ejecución si no hay término a buscar
    }

    this.BusquedasService.buscar('tipo_cita', termino)
    .subscribe((resp: Tipo_cita[]) => {  // Cambia el tipo a HorarioMedico[] para que coincida con la estructura esperada
      this.tiposCitas = resp;
  });  
         
}  




}

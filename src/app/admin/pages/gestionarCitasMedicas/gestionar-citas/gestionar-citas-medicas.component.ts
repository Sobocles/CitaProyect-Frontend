import { Component, OnInit } from '@angular/core';
import { BusquedasService } from '../../services/busquedas.service';
import { CitaMedica, CitasResponse } from '../../interface/cita_medica';
import { CitaMedicaService } from '../../services/cita-medica.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestionar-citas-medicas',
  templateUrl: './gestionar-citas-medicas.component.html',
  styleUrls: ['./gestionar-citas-medicas.component.scss']
})
export class GestionarCitasMedicasComponent implements OnInit {

  public citas: CitaMedica[] = [];
  public desde: number = 0;
  public totalCitas: number = 0;
  public mostrarEspecialidad: boolean = false;



  public citasMedicas: CitaMedica[] = [];

    constructor(private BusquedasService: BusquedasService, private CitaMedicaService: CitaMedicaService){}

    ngOnInit(): void {
      this.cargarCitas();
    }
  
  buscar(termino: string): void {
    console.log(termino);
    if (termino.length === 0) {
     
        return; // Termina la ejecución si no hay término a buscar
    }

    this.BusquedasService.buscar('cita_medica', termino)
    .subscribe((resp: CitasResponse) => {  // Cambia el tipo a HorarioMedico[] para que coincida con la estructura esperada
      console.log('aqui ',resp);
      this.citas = resp.citas;

  
  });  
         
}

borrarCita( cita: any ) {

  Swal.fire({
    title: '¿Borrar Horario?',
    text: `Esta seguro que desea eliminar esta cita?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrarlo'
  }).then((result) => {
    if (result.value) {
      
      this.CitaMedicaService.borrarCitaMedica( cita.idCita )
        .subscribe( resp => {
          
          this.cargarCitas()
          Swal.fire(
            'Horario borrado',
            `Horario ${ cita.idCita } fue eliminado correctamente`,
            'success'
          );
          
        });

    }
  })

}

cargarCitas() {
  this.CitaMedicaService.cargarCitaMedica()
    .subscribe((response: CitasResponse) => { 
      console.log('aqui esta las citas',response);
      this.citas = response.citas; 
      console.log('arreglo de citas',this.citas);

    });
}



}

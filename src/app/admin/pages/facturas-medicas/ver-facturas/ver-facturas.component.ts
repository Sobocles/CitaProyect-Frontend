import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { Factura } from '../../../../pacientes/pages/interfaces/payment';

@Component({
  selector: 'app-ver-facturas',
  templateUrl: './ver-facturas.component.html',
  styleUrls: ['./ver-facturas.component.scss']
})
export class VerFacturasComponent implements OnInit {

  facturas: any[] = []; // Arreglo para almacenar las facturas

  constructor(private FacturaService: FacturaService, private router: Router, private BusquedasService: BusquedasService) { } // Inyecta tu servicio aquí

  ngOnInit(): void {
    this.cargarFacturas();
   
  }

  cargarFacturas() {
    this.FacturaService.cargarAllFactura()
    .subscribe((data: any) => {
      console.log(data);
      console.log('aqui la data',data);
      this.facturas = data.facturas;
      console.log('aqui estan las facturas',this.facturas);
    }, error => {
      console.error('Error al cargar las facturas:', error);
    });
  }

  cambiarPagina(valor: number) {
    // Implementación de cambio de página si es necesario
  }

  borrarFactura( factura: number ) {

    Swal.fire({
      title: '¿Borrar factura?',
      text: `Esta seguro que desea eliminar la factura ${ factura } primero asegurese de haber imprimido la factura o de contar con algun otro tipo de respaldo`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.FacturaService.borrarFactura( factura )
          .subscribe( resp => {
            
          
            Swal.fire(
              'Factura borrado',
              `${ factura } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

  buscar(termino: string): void {
    console.log('aqui esta el termino',termino);
    if (termino.length === 0) {
      return this.cargarFacturas(); // Recarga todas las facturas si no hay término de búsqueda
    }

    this.BusquedasService.buscar('facturas', termino)
      .subscribe((resp: any) => { // Asegúrate de que el tipo de respuesta sea el correcto
      
        this.facturas = resp.citas
 
      });
  }

}

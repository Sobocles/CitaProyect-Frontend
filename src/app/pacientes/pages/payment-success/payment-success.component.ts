import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitaMedicaService } from '../../../admin/pages/services/cita-medica.service';
import { CitaMedicaF } from '../interfaces/payment';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

 

  detallesCita: any | null = null;

  constructor(private route: ActivatedRoute, private CitaMedicaService: CitaMedicaService  ) {}

  /*
        ngOnInit() {
    if (this.authservice.usuario && this.authservice.usuario.rut) { 
        const rutUsuario = this.authservice.usuario.rut;
        this.cargarHistorialMedico(rutUsuario);
    } else {
        console.error("RUT del usuario no definido o usuario no autenticado");
    }

     cargarHistorialMedico(rut: string) {
    this.historialService.obtenerHistorialPorId(rut)
    .subscribe((historial:HistorialResponse) => {
      console.log(historial)
      this.historialMedico = historial.historiales;
     

    }, error => {
      console.error("Error al obtener el historial médico:", error);
    });
  }
}
  */

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idCita = params['idCita'];
      console.log('AQUI ESTA EL ID DE LA CITA', idCita);
      this.obtenerCitamedica(idCita);
      
    });
  }

  obtenerCitamedica(idCita: number) {
    this.CitaMedicaService.obtenerCitamedicaFacturaPorId(idCita)
      .subscribe(
        (response:any) => {
          console.log('AQUI ESTA LA RESPUESTA:', response);
          this.detallesCita = response.citaMedica;
          console.log('AQUI ESTA EL ARREGLO CON LOS DATOS:',this.detallesCita);
          
        },
        error => {
          console.error('Error al obtener los detalles de la cita:', error);
          // Aquí manejas los errores, como mostrar un mensaje al usuario.
        }
      );
  }

  imprimir() {
    window.print();
  }

}

import { Component, OnInit } from '@angular/core';
import { BusquedaMedicoService } from '../../services/busqueda-medico.service';
import { Bloque, BloquesResponse } from '../interfaces/busqueda-medicos';
@Component({
  selector: 'app-busqueda-medico',
  templateUrl: './busqueda-medico.component.html',
  styleUrls: ['./busqueda-medico.component.scss']
})
export class BusquedaMedicoComponent implements OnInit {

  bloques: Bloque[] = [];

  constructor(private BusquedaMedicoService: BusquedaMedicoService) { }
  
  ngOnInit(): void {
    this.BusquedaMedicoService.bloques$
      .subscribe(data => {
        this.bloques = data;
        console.log(this.bloques);
      });
  }

  agendarCita(bloque: Bloque): void {
    // Aquí va el código para enviar la solicitud al backend
    // para el pago con PayPal. Se enviará el precio del bloque seleccionado.
    console.log('Precio de la cita:', bloque.precio);
    this.BusquedaMedicoService.pagarCita(bloque.precio).subscribe(
      response => {
        console.log(response);
        const approvalLink = response.links.find((link: { rel: string, href: string }) => link.rel === 'approve').href;
        window.location.href = approvalLink;
    },
      error => {
        // Manejar el error. Por ejemplo, mostrar un mensaje de error.
        console.error('Error al agendar cita:', error);
      }
    );
  }

}

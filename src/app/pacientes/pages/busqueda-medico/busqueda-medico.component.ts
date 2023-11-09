import { Component, OnInit } from '@angular/core';
import { BusquedaMedicoService } from '../../services/busqueda-medico.service';
import { Bloque, BloquesResponse } from '../interfaces/busqueda-medicos';
import { CitaMedicaService } from '../../../admin/pages/services/cita-medica.service';
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-busqueda-medico',
  templateUrl: './busqueda-medico.component.html',
  styleUrls: ['./busqueda-medico.component.scss']
})
export class BusquedaMedicoComponent implements OnInit {

  bloques: Bloque[] = [];

  constructor(private BusquedaMedicoService: BusquedaMedicoService, private CitaMedicaService: CitaMedicaService, private AuthService: AuthService) { }
  
  ngOnInit(): void {
    this.BusquedaMedicoService.bloques$
      .subscribe(data => {
        this.bloques = data;
        console.log(this.bloques);
      });
      const rutPaciente = this.AuthService.usuario.rut;
      console.log('Aqui esta el rut del paciente logeado',rutPaciente);
  }

  agendarCita(bloque: Bloque): void {

    const rutPaciente = this.AuthService.usuario.rut!;
    console.log('Aqui esta el rut del paciente logeado',bloque);
    console.log('Aqui esta el rut del paciente logeado',rutPaciente);
  
    // Primero creamos la cita médica
    this.CitaMedicaService.crearCitaMedicaPaciente(bloque, rutPaciente)
      .subscribe(
        (response) => {
          console.log('Cita creada con éxito', response);
          console.log('AQUI ESTA EL ID CREADO', response.cita.idCita);
          
          // Una vez que la cita está creada, procedemos con el pago
          console.log('Precio de la cita:', bloque.precio);
          this.BusquedaMedicoService.pagarCita(bloque.precio, bloque.especialidad, response.cita.idCita)
            .subscribe(
              responsePago => {
                console.log('Aquí está la respuesta del pago', responsePago);
                // Aquí manejas la redirección o lo que sea necesario después del pago
                window.location.href = responsePago.init_point;
              },
              errorPago => {
                console.error('Error al crear la orden de pago:', errorPago);
              }
            );
        },
        (error) => {
          console.error('Error al crear la cita médica:', error);
        }
      );
  }
  
  

}

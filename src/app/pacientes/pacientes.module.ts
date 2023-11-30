import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusquedaMedicoComponent } from './pages/busqueda-medico/busqueda-medico.component';
import { HistorialPacienteComponent } from './pages/historial-paciente/historial-paciente.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentFailureComponent } from './pages/payment-failure/payment-failure.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CambiarPasswordComponent } from './pages/cambiar-password/cambiar-password.component';
import { VerCitasPacienteComponent } from './pages/ver-citas-paciente/ver-citas-paciente.component'; 


@NgModule({
  declarations: [
    AgendarCitaComponent,
    FormularioCitaComponent,
    LayoutPageComponent,
    BusquedaMedicoComponent,
    HistorialPacienteComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    CambiarPasswordComponent,
    VerCitasPacienteComponent
 


  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ]
})
export class PacientesModule { }

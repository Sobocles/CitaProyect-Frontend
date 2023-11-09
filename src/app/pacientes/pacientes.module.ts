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



@NgModule({
  declarations: [
    AgendarCitaComponent,
    FormularioCitaComponent,
    LayoutPageComponent,
    BusquedaMedicoComponent,
    HistorialPacienteComponent,
    PaymentSuccessComponent,
 


  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PacientesModule { }

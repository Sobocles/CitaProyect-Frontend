import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HistorialMedicoComponent } from './pages/historial-medico/historial-medico.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AgendarCitaComponent,
    FormularioCitaComponent,
    LayoutPageComponent,
    HistorialMedicoComponent,
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class PacientesModule { }

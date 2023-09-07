import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [
    AgendarCitaComponent,
    FormularioCitaComponent,
    LayoutPageComponent,
 
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule
  ]
})
export class PacientesModule { }

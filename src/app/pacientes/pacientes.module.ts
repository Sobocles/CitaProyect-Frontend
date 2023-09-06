import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';




@NgModule({
  declarations: [
    AgendarCitaComponent,
    FormularioCitaComponent,
 
  ],
  imports: [
    CommonModule
  ]
})
export class PacientesModule { }

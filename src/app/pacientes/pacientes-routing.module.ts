import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { RouterModule, Routes } from '@angular/router';
import { HistorialMedicoComponent } from './pages/historial-medico/historial-medico.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'Agendar-cita', component: AgendarCitaComponent },

      { path: 'formulario-cita', component: FormularioCitaComponent },

      { path: 'historial-medico', component: HistorialMedicoComponent },

      { path: '**', redirectTo: 'Agendar-cita' },
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class PacientesRoutingModule { }

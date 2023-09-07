import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'Agendar-cita', component: AgendarCitaComponent },
      { path: 'formulario-cita', component: FormularioCitaComponent },
      { path: '**', redirectTo: 'Agendar-cita' },
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class PacientesRoutingModule { }

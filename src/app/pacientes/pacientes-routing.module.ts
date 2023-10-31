import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { FormularioCitaComponent } from './pages/formulario-cita/formulario-cita.component';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaMedicoComponent } from './pages/busqueda-medico/busqueda-medico.component';
import { HistorialComponent } from '../medicos/historial/historial.component';
import { HistorialPacienteComponent } from './pages/historial-paciente/historial-paciente.component';
import { AuthGuard } from '../auth/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent, canActivate: [AuthGuard],
    children: [
      { path: 'Agendar-cita', component: AgendarCitaComponent, canActivate: [AuthGuard] },

      { path: 'formulario-cita', component: FormularioCitaComponent, canActivate: [AuthGuard] },

      { path: 'busqueda-medico', component: BusquedaMedicoComponent, canActivate: [AuthGuard] },

      { path: 'historial', component: HistorialPacienteComponent, canActivate: [AuthGuard] },
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class PacientesRoutingModule { }

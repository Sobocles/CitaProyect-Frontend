import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionarPacientesComponent } from './pages/gestionar-pacientes/gestionar-pacientes.component';
import { GestionarMedicosComponent } from './pages/gestionar-medicos/gestionar-medicos.component';
import { GestionarCitasMedicasComponent } from './pages/gestionarCitasMedicas/gestionar-citas-medicas.component';
import { GestionarTiposCitasComponent } from './pages/gestionarTiposCitas/gestionar-tipos-citas.component';
import { GestionarHorariosMedicosComponent } from './pages/gestionarHorariosMedicos/gestionar-horarios-medicos.component';
import { AgregarMedicoComponent } from './pages/gestionar-medicos/agregar-medico.component';
import { AgregarPacienteComponent } from './pages/gestionar-pacientes/agregar-paciente/agregar-paciente.component';
import { AgregarHorarioMedicoComponent } from './pages/gestionarHorariosMedicos/agregar-horario/agregar-horario.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'gestionar-pacientes', component: GestionarPacientesComponent },
      {
        path: 'agregar-paciente', component: AgregarPacienteComponent, // El componente al que deseas redirigir
      },
      { path: 'gestionar-medicos', component: GestionarMedicosComponent },
      {
        path: 'agregar-medico', component: AgregarMedicoComponent, // El componente al que deseas redirigir
      },
      { path: 'gestionar-citas', component: GestionarCitasMedicasComponent },

      { path: 'gestionar-horarios-medicos', component: GestionarHorariosMedicosComponent},

      { path: 'agregar-horario-medico', component: AgregarHorarioMedicoComponent },

      { path: 'gestionar-tipos-citas', component: GestionarTiposCitasComponent },

      { path: 'agregar-tipos-citas', component: GestionarTiposCitasComponent },

    
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

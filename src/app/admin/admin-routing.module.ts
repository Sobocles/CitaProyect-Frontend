import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionarPacientesComponent } from './pages/gestionar-pacientes/gestionar-pacientes.component';
import { GestionarCitasMedicasComponent } from './pages/gestionarCitasMedicas/gestionar-citas-medicas.component';
import { GestionarTiposCitasComponent } from './pages/gestionarTiposCitas/gestionar-tipos-citas.component';
import { GestionarHorariosMedicosComponent } from './pages/gestionarHorariosMedicos/gestionar-horarios-medicos.component';
import { AgregarPacienteComponent } from './pages/gestionar-pacientes/agregar-paciente/agregar-paciente.component';
import { AgregarHorarioMedicoComponent } from './pages/gestionarHorariosMedicos/agregar-horario/agregar-horario.component';
import { GestionarMedicosComponent } from './pages/gestionar-medicos/gestionar-medicos.component';
import { AgregarCitaMedicaComponent } from './pages/gestionarCitasMedicas/agregar-cita-medica/agregar-cita-medica.component';
import { AgregarmedicoComponent } from './pages/gestionar-medicos/agregarmedico/agregarmedico.component';
import { AgregarTipoCitaComponent } from './pages/gestionarTiposCitas/agregar-tipo-cita/agregar-tipo-cita.component';
import { EditarMedicoComponent } from './pages/gestionar-medicos/editar-medico/editar-medico.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'gestionar-pacientes', component: GestionarPacientesComponent },
      {
        path: 'agregar-paciente', component: AgregarPacienteComponent, // El componente al que deseas redirigir
      },
      {
        path: 'gestionar-medicos', component: GestionarMedicosComponent, // El componente al que deseas redirigir
      },
      {
        path: 'agregar-medico', component: AgregarmedicoComponent, // El componente al que deseas redirigir
      },

      {
        path: 'editar-medico/:id',
        component: EditarMedicoComponent
      },

      { path: 'gestionar-cita', component: GestionarCitasMedicasComponent },

      { path: 'agregar-cita', component: AgregarCitaMedicaComponent },

      { path: 'gestionar-horarios-medicos', component: GestionarHorariosMedicosComponent},

      { path: 'agregar-horario-medico', component: AgregarHorarioMedicoComponent },

      { path: 'gestionar-tipo-cita', component: GestionarTiposCitasComponent },

      { path: 'agregar-tipo-cita', component: AgregarTipoCitaComponent },
    

    
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

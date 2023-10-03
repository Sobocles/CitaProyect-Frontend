import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarMedicosComponent } from './pages/gestionar-medicos/gestionar-medicos.component';
import { GestionarHorariosMedicosComponent } from './pages/gestionarHorariosMedicos/gestionar-horarios-medicos.component';
import { GestionarCitasMedicasComponent } from './pages/gestionarCitasMedicas/gestionar-citas-medicas.component';
import { GestionarTiposCitasComponent } from './pages/gestionarTiposCitas/gestionar-tipos-citas.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { GestionarPacientesComponent } from './pages/gestionar-pacientes/gestionar-pacientes.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AgregarMedicoComponent } from './pages/gestionar-medicos/agregar-medico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarPacienteComponent } from './pages/gestionar-pacientes/agregar-paciente/agregar-paciente.component';
import { AgregarHorarioMedicoComponent } from './pages/gestionarHorariosMedicos/agregar-horario/agregar-horario.component';
import { AgregarCitaMedicaComponent } from './pages/gestionarCitasMedicas/agregar-cita-medica/agregar-cita-medica.component';









@NgModule({
  declarations: [
    GestionarCitasMedicasComponent,
    GestionarHorariosMedicosComponent,
    GestionarPacientesComponent,
    GestionarTiposCitasComponent,
    GestionarMedicosComponent,
    LayoutPageComponent,
    AgregarMedicoComponent,
    GestionarPacientesComponent,
    AgregarPacienteComponent,
    AgregarHorarioMedicoComponent,
    AgregarCitaMedicaComponent,
  

   
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

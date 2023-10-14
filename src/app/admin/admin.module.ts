import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarHorariosMedicosComponent } from './pages/gestionarHorariosMedicos/gestionar-horarios-medicos.component';
import { GestionarCitasMedicasComponent } from './pages/gestionarCitasMedicas/gestionar-citas-medicas.component';
import { GestionarTiposCitasComponent } from './pages/gestionarTiposCitas/gestionar-tipos-citas.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { GestionarPacientesComponent } from './pages/gestionar-pacientes/gestionar-pacientes.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { AgregarPacienteComponent } from './pages/gestionar-pacientes/agregar-paciente/agregar-paciente.component';
import { AgregarHorarioMedicoComponent } from './pages/gestionarHorariosMedicos/agregar-horario/agregar-horario.component';
import { AgregarCitaMedicaComponent } from './pages/gestionarCitasMedicas/agregar-cita-medica/agregar-cita-medica.component';
import { GestionarMedicosComponent } from './pages/gestionar-medicos/gestionar-medicos.component';
import { AgregarmedicoComponent } from './pages/gestionar-medicos/agregarmedico/agregarmedico.component';
import { AgregarTipoCitaComponent } from './pages/gestionarTiposCitas/agregar-tipo-cita/agregar-tipo-cita.component';
import { EditarMedicoComponent } from './pages/gestionar-medicos/editar-medico/editar-medico.component';







@NgModule({
  declarations: [
    GestionarCitasMedicasComponent,
    GestionarHorariosMedicosComponent,
    GestionarPacientesComponent,
    GestionarTiposCitasComponent,
    GestionarHorariosMedicosComponent,
  
    LayoutPageComponent,
 
    GestionarPacientesComponent,
    AgregarPacienteComponent,
    AgregarHorarioMedicoComponent,
    AgregarCitaMedicaComponent,
    GestionarCitasMedicasComponent,
    GestionarMedicosComponent,
    AgregarmedicoComponent,
    AgregarTipoCitaComponent,
    EditarMedicoComponent,
  

  
   
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,

  ]
})
export class AdminModule { }

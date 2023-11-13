import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionarPacientesComponent } from './pages/gestionar-pacientes/gestionar-pacientes/gestionar-pacientes.component';
import { GestionarCitasMedicasComponent } from './pages/gestionarCitasMedicas/gestionar-citas/gestionar-citas-medicas.component';
import { GestionarTiposCitasComponent } from './pages/gestionarTiposCitas/gestionar-tipos-citas/gestionar-tipos-citas.component';
import { GestionarHorariosMedicosComponent } from './pages/gestionarHorariosMedicos/gestionar-horarios-medicos/gestionar-horarios-medicos.component';
import { AgregarPacienteComponent } from './pages/gestionar-pacientes/agregar-paciente/agregar-paciente.component';
import { AgregarHorarioMedicoComponent } from './pages/gestionarHorariosMedicos/agregar-horario/agregar-horario.component';
import { GestionarMedicosComponent } from './pages/gestionar-medicos/gestiona-medicos/gestionar-medicos.component';
import { AgregarCitaMedicaComponent } from './pages/gestionarCitasMedicas/agregar-cita-medica/agregar-cita-medica.component';
import { AgregarmedicoComponent } from './pages/gestionar-medicos/agregarmedico/agregarmedico.component';
import { AgregarTipoCitaComponent } from './pages/gestionarTiposCitas/agregar-tipo-cita/agregar-tipo-cita.component';
import { EditarMedicoComponent } from './pages/gestionar-medicos/editar-medico/editar-medico.component';
import { EditarHorarioComponent } from './pages/gestionarHorariosMedicos/editar-horario/editar-horario.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EditarUsuarioComponent } from './pages/gestionar-pacientes/editar-usuario/editar-usuario.component';
import { EditarTipoCitaComponent } from './pages/gestionarTiposCitas/editar-tipo-cita/editar-tipo-cita.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InfoClinicaComponent } from './pages/info-clinica/info-clinica.component';
import { AgregarInfoClinicaComponent } from './pages/info-clinica/agregar-info-clinica/agregar-info-clinica.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'info-clinica', component: InfoClinicaComponent, canActivate: [AuthGuard]  },

      { path: 'agregar-info-clinica', component: AgregarInfoClinicaComponent, canActivate: [AuthGuard]  },

      { path: 'inicio-instrucciones', component: InicioComponent, canActivate: [AuthGuard]  },

      { path: 'gestionar-pacientes', component: GestionarPacientesComponent , canActivate: [AuthGuard] },
      {
        path: 'agregar-paciente', component: AgregarPacienteComponent, canActivate: [AuthGuard]  // El componente al que deseas redirigir
      },
      {
        path: 'editar-usuario/:id', 
        component: EditarUsuarioComponent, canActivate: [AuthGuard] 
      },
      {
        path: 'gestionar-medicos', component: GestionarMedicosComponent, canActivate: [AuthGuard] // El componente al que deseas redirigir
      },
      {
        path: 'agregar-medico', component: AgregarmedicoComponent, canActivate: [AuthGuard] // El componente al que deseas redirigir
      },

      {
        path: 'editar-medico/:id', 
        component: EditarMedicoComponent, canActivate: [AuthGuard] 
      },

      
      {
        path: 'editar-horario/:id',
        component: EditarHorarioComponent, canActivate: [AuthGuard] 
      },

      { path: 'gestionar-cita', component: GestionarCitasMedicasComponent, canActivate: [AuthGuard]  },

      { path: 'agregar-cita', component: AgregarCitaMedicaComponent, canActivate: [AuthGuard]  },

      { path: 'gestionar-horarios-medicos', component: GestionarHorariosMedicosComponent, canActivate: [AuthGuard] },

      { path: 'agregar-horario-medico', component: AgregarHorarioMedicoComponent, canActivate: [AuthGuard]  },

      { path: 'gestionar-tipo-cita', component: GestionarTiposCitasComponent, canActivate: [AuthGuard]  },

      { path: 'agregar-tipo-cita', component: AgregarTipoCitaComponent, canActivate: [AuthGuard]  },

      { path: 'editar-tipoCita/:id', component: EditarTipoCitaComponent, canActivate: [AuthGuard]  },

      
    

    
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

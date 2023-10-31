import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    
    path: 'paciente',
    loadChildren: () => import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
    canActivate: [AuthGuard], // Aplica el AuthGuard a esta ruta
    canLoad: [AuthGuard]
  },
  {
    path: 'ad',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard], // Aplica el AuthGuard a esta ruta
  },
  {
    path: 'medicos',
    loadChildren: () => import('./medicos/medicos.module').then((m) => m.MedicosModule),
    canActivate: [AuthGuard], // Aplica el AuthGuard a esta ruta
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }

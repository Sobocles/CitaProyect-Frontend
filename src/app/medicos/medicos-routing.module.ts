import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionarHistorialesComponent } from './gestionar-historiales/gestionar-historiales.component';
import { HistorialComponent } from './historial/historial.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerCitasMedicasComponent } from './ver-citas-medicas/ver-citas-medicas.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'gestionar-historiales', component: GestionarHistorialesComponent, canActivate: [AuthGuard], },
      { path: 'ver-citas', component:VerCitasMedicasComponent, canActivate: [AuthGuard], },
      { path: 'agregar-historial', component: HistorialComponent, canActivate: [AuthGuard], },
      { path: '**', redirectTo: 'gestionar-historiales' },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class MedicosRoutingModule { }

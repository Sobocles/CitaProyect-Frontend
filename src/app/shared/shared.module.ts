import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [DashboardComponent],
})
export class SharedModule { }

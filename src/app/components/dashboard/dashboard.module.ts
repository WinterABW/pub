import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material-module';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(DashboardRoutes),
    DashboardComponent,
  ],
})
export class DashboardModule { }

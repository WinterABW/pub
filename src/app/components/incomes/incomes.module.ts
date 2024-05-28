import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomesComponent } from './incomes.component';
import { RouterModule } from '@angular/router';
import { IncomesRoutes} from './incomes.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IncomesRoutes),
    IncomesComponent,
  ],
})
export class Incomes {}

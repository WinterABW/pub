import { Component } from '@angular/core';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [StatCardComponent,SalesOverviewComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {

}

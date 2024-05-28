import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent{
  
}

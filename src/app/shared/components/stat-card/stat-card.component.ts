import {Component, Input, OnInit} from '@angular/core';
import { MaterialModule } from '../../material-module';
import { CountUpModule } from 'ngx-countup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  imports:[MaterialModule,CountUpModule,CommonModule]
})
export class StatCardComponent implements OnInit {
  @Input() color;
  @Input() label;
  @Input() number;
  @Input() decimal = 0;
  @Input() icon = '';
  options = {
    decimalPlaces: this.decimal
  };

  ngOnInit(): void {
    this.options.decimalPlaces = this.decimal;
  }

  getBorderColor() {
    return `border-${this.color}-500`;
  }
  getTextColor() {
    return `text-${this.color}-500`;
  }
}

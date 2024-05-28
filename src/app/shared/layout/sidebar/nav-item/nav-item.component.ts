import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { NavService } from './nav.service';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
  standalone:true,
  imports:[MaterialModule,CommonModule,TablerIconsModule]
})
export class AppNavItemComponent implements OnChanges,OnInit {
  @Input() item: NavItem | any;
  @Input() depth: any;

  public navService=inject(NavService)
  public router=inject(Router)

  ngOnInit(): void {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}

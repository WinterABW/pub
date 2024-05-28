import { Component } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { BrandingComponent } from './branding.component';
import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule,AppNavItemComponent,BrandingComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = navItems;
}

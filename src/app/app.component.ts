import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { LoginComponent } from './shared/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Picta';
}

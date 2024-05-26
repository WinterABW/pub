import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MaterialModule } from '../../material-module';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  user: any;
  isLoggin: any;
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.user$.subscribe((res: any) => {
      if (res) {
        this.user = res;
      } else {
        this.authService.getUserData().subscribe((response: any) => {
          this.authService.setUserData(response);
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}

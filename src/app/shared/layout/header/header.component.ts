import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../Icons/icons.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone:true,
  imports:[MaterialModule,IconsModule,RouterModule],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  user: any;
  isLoggin: any;
  private authService = inject(AuthService);


  showFiller = false;

  constructor(public dialog: MatDialog) {}

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

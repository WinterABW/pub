import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { MenuItems } from '../../menu-items';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MaterialModule, RouterModule, ToolbarComponent, LoginComponent],
  providers: [MenuItems],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;

  changeDetectorRef = inject(ChangeDetectorRef);
  media = inject(MediaMatcher);
  menuItems = inject(MenuItems).getMenuitem();

  private _mobileQueryListener: () => void;

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngonInit(): void {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

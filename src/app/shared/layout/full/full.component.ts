import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [MaterialModule,RouterModule,SidebarComponent,HeaderComponent],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent implements OnInit{

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav | any;

  //get options from service
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement: HTMLHtmlElement;
  private breakpointObserver: BreakpointObserver;
  @Inject(DOCUMENT) private document: Document
  @Inject(PLATFORM_ID) private platformId: Object
  
  get isOver(): boolean {
    return this.isMobileScreen;
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.htmlElement = this.document.querySelector('html')!;
      this.layoutChangesSubscription = this.breakpointObserver
        .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
        .subscribe((state) => {
  
          this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
  
          this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        });
    }
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
  }
}

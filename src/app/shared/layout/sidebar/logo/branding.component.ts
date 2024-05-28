import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  standalone:true,
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="assets/img/logo.svg"
          class="w-3/4 h-3/4"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}

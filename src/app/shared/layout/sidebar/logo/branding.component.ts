import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  standalone:true,
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="assets/img/logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
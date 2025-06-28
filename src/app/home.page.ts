import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <ion-app>
      <ion-menu contentId="main-content">
        <!-- ...menú lateral... -->
      </ion-menu>
      <div id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-menu-button></ion-menu-button>
            <!-- ...otros elementos del header... -->
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-router-outlet></ion-router-outlet>
        </ion-content>
      </div>
    </ion-app>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-standalone-page',
  templateUrl: './standalone-page.component.html',
  styleUrls: ['./standalone-page.component.css'],
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class StandalonePageComponent {
  // component logic
}
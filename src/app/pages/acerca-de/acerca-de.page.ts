import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AcercaDePage {

  developerInfo = {
    name: 'Sander Rafael Fernandez Tolentino',
    email: 'sanderfernandez0812@gmail.com',
    phone: '+1 (829) 978-2299',
    linkedin: 'https://www.linkedin.com/in/sander-fernandez-tolentino-8572b2151',
    github: 'https://github.com/SanderFernadez',
    photo: 'assets/images/foto.jpg'
  };

  openLink(url: string) {
    window.open(url, '_blank');
  }

  sendEmail() {
    window.open(`mailto:${this.developerInfo.email}`, '_blank');
  }

  callPhone() {
    window.open(`tel:${this.developerInfo.phone}`, '_blank');
  }
} 
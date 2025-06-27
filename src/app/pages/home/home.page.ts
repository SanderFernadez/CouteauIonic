import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {

  tools = [
    {
      title: 'Predicción de Género',
      description: 'Descubre el género probable de un nombre',
      icon: 'person',
      route: '/genero',
      color: 'primary'
    },
    {
      title: 'Predicción de Edad',
      description: 'Estima la edad basada en un nombre',
      icon: 'calendar',
      route: '/edad',
      color: 'secondary'
    },
    {
      title: 'Universidades por País',
      description: 'Encuentra universidades de cualquier país',
      icon: 'school',
      route: '/universidades',
      color: 'tertiary'
    },
    {
      title: 'Clima en República Dominicana',
      description: 'Consulta el clima actual en Santo Domingo',
      icon: 'partly-sunny',
      route: '/clima',
      color: 'warning'
    },
    {
      title: 'Información de Pokémon',
      description: 'Busca información detallada de Pokémon',
      icon: 'game-controller',
      route: '/pokemon',
      color: 'success'
    },
    {
      title: 'Noticias de WordPress',
      description: 'Lee las últimas noticias de WordPress',
      icon: 'newspaper',
      route: '/noticias',
      color: 'danger'
    }
  ];

  constructor(private router: Router) { }

  navigateToTool(route: string) {
    this.router.navigate([route]);
  }

  goToAbout() {
    this.router.navigate(['/acerca-de']);
  }
} 
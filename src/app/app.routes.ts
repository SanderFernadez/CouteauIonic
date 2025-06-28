import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'genero', loadComponent: () => import('./pages/genero/genero.page').then(m => m.GeneroPage) },
  { path: 'edad', loadComponent: () => import('./pages/edad/edad.page').then(m => m.EdadPage) },
  { path: 'universidades', loadComponent: () => import('./pages/universidades/universidades.page').then(m => m.UniversidadesPage) },
  { path: 'clima', loadComponent: () => import('./pages/clima/clima.page').then(m => m.ClimaPage) },
  { path: 'pokemon', loadComponent: () => import('./pages/pokemon/pokemon.page').then(m => m.PokemonPage) },
  { path: 'noticias', loadComponent: () => import('./pages/noticias/noticias.page').then(m => m.NoticiasPage) },
  { path: 'acerca-de', loadComponent: () => import('./pages/acerca-de/acerca-de.page').then(m => m.AcercaDePage) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

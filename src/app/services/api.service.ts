import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GenderResponse {
  name: string;
  gender: string;
  probability: number;
  count: number;
}

export interface AgeResponse {
  name: string;
  age: number;
  count: number;
}

export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
}

export interface WeatherResponse {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  name: string;
}

export interface PokemonResponse {
  name: string;
  base_experience: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  cries: {
    latest: string;
  };
}

export interface NewsPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Predicción de género
  getGender(name: string): Observable<GenderResponse> {
    return this.http.get<GenderResponse>(`https://api.genderize.io/?name=${name}`);
  }

  // Predicción de edad
  getAge(name: string): Observable<AgeResponse> {
    return this.http.get<AgeResponse>(`https://api.agify.io/?name=${name}`);
  }

  // Universidades por país
  getUniversities(country: string): Observable<University[]> {
    return this.http.get<University[]>(`http://universities.hipolabs.com/search?country=${country}`);
  }

  // Clima en República Dominicana
  getWeather(): Observable<WeatherResponse> {
    const apiKey = 'b44cf29c00c3f1a504b557fdedbeaeac'; // API key proporcionada por el usuario
    return this.http.get<WeatherResponse>(`https://api.openweathermap.org/data/2.5/weather?q=Santo Domingo,DO&appid=${apiKey}&units=metric`);
  }

  // Información de Pokémon
  getPokemon(name: string): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  }

  // Noticias de WordPress
  getNews(): Observable<NewsPost[]> {
    // Usar el blog oficial de WordPress
    return this.http.get<NewsPost[]>('https://wordpress.org/news/wp-json/wp/v2/posts');
  }
} 
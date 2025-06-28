import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService, WeatherResponse } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClimaPage implements OnInit {

  weatherData: WeatherResponse | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.loading = true;
    this.error = '';
    this.weatherData = null;

    this.apiService.getWeather()
      .pipe(
        catchError(error => {
          this.error = 'Error al obtener el clima. Verifica tu API key de OpenWeatherMap.';
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        if (result) {
          this.weatherData = result;
        }
      });
  }

  getWeatherIcon(): string {
    if (!this.weatherData || !this.weatherData.weather[0]) return 'partly-sunny';
    
    const weatherMain = this.weatherData.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear': return 'sunny';
      case 'clouds': return 'cloudy';
      case 'rain': return 'rainy';
      case 'snow': return 'snow';
      case 'thunderstorm': return 'thunderstorm';
      case 'drizzle': return 'rainy';
      case 'mist':
      case 'fog': return 'cloudy';
      default: return 'partly-sunny';
    }
  }

  getWeatherDescription(): string {
    if (!this.weatherData || !this.weatherData.weather[0]) return '';
    return this.weatherData.weather[0].description;
  }

  getTemperature(): number {
    if (!this.weatherData) return 0;
    return Math.round(this.weatherData.main.temp);
  }

  getHumidity(): number {
    if (!this.weatherData) return 0;
    return this.weatherData.main.humidity;
  }

  getPressure(): number {
    if (!this.weatherData) return 0;
    return this.weatherData.main.pressure;
  }

  refreshWeather() {
    this.getWeather();
  }
} 
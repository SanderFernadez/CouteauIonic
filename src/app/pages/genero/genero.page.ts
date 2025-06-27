import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, GenderResponse } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.page.html',
  styleUrls: ['./genero.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GeneroPage {

  name: string = '';
  genderResult: GenderResponse | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) { }

  predictGender() {
    if (!this.name.trim()) {
      this.error = 'Por favor ingresa un nombre';
      this.genderResult = null;
      return;
    }

    this.loading = true;
    this.error = '';
    this.genderResult = null;

    this.apiService.getGender(this.name.trim())
      .pipe(
        catchError(error => {
          this.error = 'Error al obtener la predicción. Intenta de nuevo.';
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        if (result) {
          this.genderResult = result;
        }
      });
  }

  getGenderColor(): string {
    if (!this.genderResult) return '';
    return this.genderResult.gender === 'male' ? 'primary' : 'danger';
  }

  getGenderIcon(): string {
    if (!this.genderResult) return '';
    return this.genderResult.gender === 'male' ? 'male' : 'female';
  }

  getGenderText(): string {
    if (!this.genderResult) return '';
    return this.genderResult.gender === 'male' ? 'Masculino' : 'Femenino';
  }

  getProbabilityPercentage(): number {
    if (!this.genderResult) return 0;
    return Math.round(this.genderResult.probability * 100);
  }

  clearResults() {
    this.name = '';
    this.genderResult = null;
    this.error = '';
  }
} 
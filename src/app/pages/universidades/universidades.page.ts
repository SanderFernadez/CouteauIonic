import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, University } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.page.html',
  styleUrls: ['./universidades.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UniversidadesPage {

  country: string = '';
  universities: University[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) { }

  searchUniversities() {
    if (!this.country.trim()) {
      this.error = 'Por favor ingresa un país';
      this.universities = [];
      return;
    }

    this.loading = true;
    this.error = '';
    this.universities = [];

    this.apiService.getUniversities(this.country.trim())
      .pipe(
        catchError(error => {
          this.error = 'Error al buscar universidades. Intenta de nuevo.';
          return of([]);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.universities = result;
        if (result.length === 0 && !this.error) {
          this.error = 'No se encontraron universidades para este país.';
        }
      });
  }

  openWebsite(url: string) {
    window.open(url, '_blank');
  }

  clearResults() {
    this.country = '';
    this.universities = [];
    this.error = '';
  }

  getUniversityCount(): string {
    if (this.universities.length === 0) return '0';
    return this.universities.length.toString();
  }
} 
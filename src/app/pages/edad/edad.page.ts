import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, AgeResponse } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edad',
  templateUrl: './edad.page.html',
  styleUrls: ['./edad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EdadPage {

  name: string = '';
  ageResult: AgeResponse | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) { }

  predictAge() {
    if (!this.name.trim()) {
      this.error = 'Por favor ingresa un nombre';
      this.ageResult = null;
      return;
    }

    this.loading = true;
    this.error = '';
    this.ageResult = null;

    this.apiService.getAge(this.name.trim())
      .pipe(
        catchError(error => {
          this.error = 'Error al obtener la predicción. Intenta de nuevo.';
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        if (result) {
          this.ageResult = result;
        }
      });
  }

  getAgeCategory(): string {
    if (!this.ageResult) return '';
    
    const age = this.ageResult.age;
    if (age < 18) return 'joven';
    if (age < 65) return 'adulto';
    return 'anciano';
  }

  getAgeCategoryColor(): string {
    const category = this.getAgeCategory();
    switch (category) {
      case 'joven': return 'success';
      case 'adulto': return 'primary';
      case 'anciano': return 'warning';
      default: return 'medium';
    }
  }

  getAgeCategoryIcon(): string {
    const category = this.getAgeCategory();
    switch (category) {
      case 'joven': return 'happy';
      case 'adulto': return 'person';
      case 'anciano': return 'person-circle';
      default: return 'person';
    }
  }

  getAgeCategoryText(): string {
    const category = this.getAgeCategory();
    switch (category) {
      case 'joven': return 'Joven';
      case 'adulto': return 'Adulto';
      case 'anciano': return 'Anciano';
      default: return '';
    }
  }

  getAgeCategoryImage(): string {
    const category = this.getAgeCategory();
    switch (category) {
      case 'joven': return 'assets/images/young.png';
      case 'adulto': return 'assets/images/adult.png';
      case 'anciano': return 'assets/images/elder.png';
      default: return '';
    }
  }

  clearResults() {
    this.name = '';
    this.ageResult = null;
    this.error = '';
  }
} 
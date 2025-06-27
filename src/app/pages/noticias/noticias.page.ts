import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService, NewsPost } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NoticiasPage implements OnInit {

  news: NewsPost[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.error = '';
    this.news = [];

    this.apiService.getNews()
      .pipe(
        catchError(error => {
          this.error = 'Error al cargar las noticias. Intenta de nuevo.';
          return of([]);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.news = result.slice(0, 10); // Limit to 10 news
        if (result.length === 0 && !this.error) {
          this.error = 'No se encontraron noticias.';
        }
      });
  }

  openNews(url: string) {
    window.open(url, '_blank');
  }

  refreshNews() {
    this.loadNews();
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
} 
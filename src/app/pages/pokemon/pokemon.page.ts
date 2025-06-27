import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, PokemonResponse } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PokemonPage {

  pokemonName: string = '';
  pokemonData: PokemonResponse | null = null;
  loading: boolean = false;
  error: string = '';
  audio: HTMLAudioElement | null = null;

  constructor(private apiService: ApiService) { }

  searchPokemon() {
    if (!this.pokemonName.trim()) {
      this.error = 'Por favor ingresa el nombre de un Pokémon';
      this.pokemonData = null;
      return;
    }

    this.loading = true;
    this.error = '';
    this.pokemonData = null;

    this.apiService.getPokemon(this.pokemonName.trim())
      .pipe(
        catchError(error => {
          this.error = 'Pokémon no encontrado. Verifica el nombre e intenta de nuevo.';
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        if (result) {
          this.pokemonData = result;
        }
      });
  }

  playCry() {
    if (this.pokemonData && this.pokemonData.cries.latest) {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      
      this.audio = new Audio(this.pokemonData.cries.latest);
      this.audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  getPokemonImage(): string {
    if (!this.pokemonData) return '';
    
    // Try to get the official artwork first, fallback to default sprite
    return this.pokemonData.sprites.other['official-artwork'].front_default || 
           this.pokemonData.sprites.front_default || '';
  }

  getAbilities(): string[] {
    if (!this.pokemonData) return [];
    return this.pokemonData.abilities.map(ability => ability.ability.name);
  }

  clearResults() {
    this.pokemonName = '';
    this.pokemonData = null;
    this.error = '';
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
} 
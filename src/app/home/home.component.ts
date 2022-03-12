import { Component, OnInit } from '@angular/core';
import { Result } from '../interfaces/appInterfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private next = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';
  private previous = '';
  public isFirstPage = false;

  constructor( private api: ApiService ){}

  ngOnInit(): void {
    this.api.getPokemons(this.next).subscribe(pokemon => {
      this.next = pokemon.next;
      this.previous = pokemon.previous ?? '';
      this.pokemons = pokemon.results.map(poke => ({...poke, url: this.getFormatImg(poke.url) }))
    });
  }

  pokemons: Result[] = [];

  getNextPokemons() {
    this.api.getPokemons(this.next).subscribe(pokemon => {
      
      pokemon.previous ? this.isFirstPage = true : this.isFirstPage = false;

      this.next = pokemon.next;
      this.previous = pokemon.previous ?? '';
      this.pokemons = pokemon.results.map(poke => ({...poke, url: this.getFormatImg(poke.url) }))
    });
  }

  getPreviousPokemons() {
    this.api.getPokemons(this.previous).subscribe(pokemon => {
      
      pokemon.previous ? this.isFirstPage = true : this.isFirstPage = false;

      this.next = pokemon.next;
      this.previous = pokemon.previous ?? '';
      this.pokemons = pokemon.results.map(poke => ({...poke, url: this.getFormatImg(poke.url) }))
    });
  }

  getFormatImg(url: string){
    const urlParts = url.split('/');
    const id = urlParts[ urlParts.length - 2 ];

    const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return picture;
  }
}

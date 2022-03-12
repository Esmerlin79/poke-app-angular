import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../interfaces/appInterfaces';

import Swal from 'sweetalert2';
import { Favorites } from '../models/Favorites';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input()
  pokemons!: Result;

  constructor() { 

  }

  ngOnInit(): void {
  }

  AddFavorite(pokemon: Result){  
    
    const favoritesArr: Favorites[] = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')!) : [];

    const isFavoriteExist = favoritesArr.filter(favorite => favorite.name == pokemon.name);
    if(isFavoriteExist.length > 0){
      return Swal.fire('Error', 'Este pokemon ya esta registrado en tu lista de favoritos', 'error')  
    }

    const favoritesPokemon = new Favorites(pokemon);
    
    favoritesArr.push(favoritesPokemon);
    sessionStorage.setItem('favorites', JSON.stringify(favoritesArr));

    return Swal.fire('Agregado exitosamente', 'Este pokemon ha sido agregado a tu lista de favorito!', 'success')  
  }

}

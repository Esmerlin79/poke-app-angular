import { Component, OnInit } from '@angular/core';
import { Favorites } from '../models/Favorites';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: Favorites[] = [];
  
  constructor() { }

  ngOnInit(): void {
     if(sessionStorage.getItem('favorites')){
      const favoritesArr: [] = JSON.parse(sessionStorage.getItem('favorites')!);
      this.favorites = favoritesArr.map(favorite => favorite);
    }
  }

  deleteFavorite(pokemon: Favorites){

    Swal.fire({
      title: 'Estas seguro de eliminar este pokemon?',
      text: `Pokemon ${pokemon.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const favoritesArr: Favorites[] = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')!) : [];
        const newFavoriteArr = favoritesArr.filter(favorite => favorite.name != pokemon.name);
        
        this.favorites = newFavoriteArr;
    
        sessionStorage.setItem('favorites', JSON.stringify(newFavoriteArr));
        Swal.fire(
          'Eliminado!',
          `El pokemon ${pokemon.name} ha sido eliminado de tus favoritos.`,
          'success'
        )
      }
    })

  }

}

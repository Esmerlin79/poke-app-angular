import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Favorites } from '../models/Favorites';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private favoritesArr: Favorites[] = [];
  public pokemon!: Favorites;
  public isError = false;

  constructor( private _activeRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this._activeRouter.params.subscribe((params: Params) => {
      this.favoritesArr = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')!) : [];
      this.pokemon = this.favoritesArr.find(favorite => favorite.name == params["name"])!;
    })
  }

  editFavorite(alias: HTMLInputElement) {

    if(alias.value.trim().length < 3){

      this.isError = true;

      const message = alias.value.trim().length === 0 
        ? 'Todos los campos son requeridos!'
        : 'El alias debe tener almenos 3 caracteres';

      return Swal.fire('Campos invalidos', message, 'error');  
    }

    this.pokemon.alias = alias.value;

    const favoritesEdit = this.favoritesArr.map(favorite => {
      if( favorite.name == alias.value){
        return this.pokemon;
      }
      return favorite;
    })

    sessionStorage.setItem('favorites', JSON.stringify(favoritesEdit))

    return Swal.fire('Editado exitosamente', 'Este pokemon ha sido editado!', 'success');  
  }

}

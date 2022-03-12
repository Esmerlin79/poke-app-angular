import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonsResponse } from '../interfaces/appInterfaces';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  getPokemons(endpoint: string): Observable<PokemonsResponse>{
    return this.http.get<PokemonsResponse>(endpoint);
  }
}

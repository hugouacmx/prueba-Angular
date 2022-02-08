import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {

  baseUrl_getAllPokemons = environment.baseUrl_getAllPokemons;
  baseUrl_getPokemonId = environment.baseUrl_getPokemonId;
  constructor( private _http: HttpClient ) { }

  getPokemons(url=this.baseUrl_getAllPokemons) {
    return this._http.get(`${url}`); 
  }

  getPokemonInfo(url:string){
    return this._http.get(`${url}`); 
  }

  getPokemonbyId(id){
    return this._http.get(`${this.baseUrl_getPokemonId}/${id}`);
  }

}

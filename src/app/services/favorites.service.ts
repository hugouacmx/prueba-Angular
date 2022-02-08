import { Injectable } from '@angular/core';
import { distinct, from, toArray } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites=[];

  constructor() { }

  public addFavorite(val:number){
    if (this.favorites.includes( val )) {
      console.log("este pokemon ya se capturo");
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ya has agregado este Pokemon!',
        showConfirmButton: false,
        timer: 1500
      })
      //sweetalert --> ya haz agregado este pokemon
    }else{
      //sweetalert --> pokemon agregado a favoritos
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Pokemon Capturado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.favorites.push(val);
    }
  }

  public removeFavorite(id:number){
    return this.favorites = this.favorites.filter(function(ele){ 
      return ele !== id; 
    });
  }
 
  public getFavorites():Array<number>{
    return this.favorites;
  }
  
}

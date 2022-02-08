import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PokeServiceService } from 'src/app/services/poke-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-pokemons',
  templateUrl: './mis-pokemons.component.html',
  styleUrls: ['./mis-pokemons.component.scss']
})
export class MisPokemonsComponent implements OnInit {
 
  getPokes=[];
  displayedColumns: string[] = ['nombre', 'tipo', 'habilidad', 'imagen', 'action'];
  dataSource = [];


  constructor( private favoritesService: FavoritesService,
                private _pokemos: PokeServiceService  ) { }

  ngOnInit(): void {
    this.favoritesService.getFavorites().forEach(async (id) => {
      await this.getPokes.push(this._pokemos.getPokemonbyId(id))
    });
    this.getFavoritesPokemon()
  }

  getFavoritesPokemon(){
    forkJoin(this.getPokes).pipe(
      map(res=>{
        let info=[]
        res.forEach(pokDet => {
          info.push( {
            id: pokDet.id,
            image: pokDet.sprites.front_default,
            name: pokDet.name, 
            ability: pokDet.abilities[0].ability.name,
            type: pokDet.types[0].type.name,
            height: pokDet.height,
            weight: pokDet.weight
          })
        });
        return info;
      })
    ) 
    .subscribe(res=>{
      console.log("favoritos",res);
      
      this.dataSource = res;
    }
    )
  }

  deletePokemon(id){
    //sweetalert --> deseas eliminar? si si hacer lo de abajo
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.favoritesService.removeFavorite(id);
        this.dataSource = this.dataSource.filter(function(ele){ 
        return ele.id !== id; 
        });
        Swal.fire(
          'Deleted!',
          'El pokemon a sido eliminado.',
          'success'
        )
      }
    })
    
  }



}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PokeServiceService } from 'src/app/services/poke-service.service';

import { MatDialog } from '@angular/material/dialog';
import { VerDetalleComponent } from '../ver-detalle/ver-detalle.component';
import { forkJoin, map, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-mundo-pokemon',
  templateUrl: './mundo-pokemon.component.html',
  styleUrls: ['./mundo-pokemon.component.scss']
})
export class MundoPokemonComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'tipo', 'habilidad', 'imagen'];
  data = {
    next: null,
    prev: null,
    total: 0
  };
  dataSource = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private _pokemos: PokeServiceService,
               public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.regresaPokemons();
  }

  regresaPokemons(url?) {
    const pokemons = this._pokemos.getPokemons(url);
    const extra= []
    
      pokemons.pipe(
        map((results:any)=>{
          this.data = {
            next: results.next,
            prev: results.previous,
            total: results.count
          }
          results.results.forEach(ele => {
            extra.push(this._pokemos.getPokemonInfo(ele.url))
          });
          return extra;
        }),
        switchMap(res => forkJoin(res)),
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
      .subscribe((res:any) => {
        this.dataSource=res;
        },
        err => {
          console.log(err);
        }
      );
  }


  viewDetail(row) {
    this.dialog.open(VerDetalleComponent, {
      data: row,
      disableClose: true
    }).afterClosed()
  }

  

  recibiRespuesta(){
    this.dialog.closeAll()
  }

  //funcion para manejar paginador
  paginatorEvt(event: any) {
    if(event.pageIndex > event.previousPageIndex ) {
      this.regresaPokemons(this.data.next);
    } else {
      this.regresaPokemons(this.data.prev);
    }
 }

}

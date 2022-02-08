import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, map, switchMap } from 'rxjs';
import { VerDetalleComponent } from 'src/app/pages/ver-detalle/ver-detalle.component';
import { PokeServiceService } from 'src/app/services/poke-service.service';

export interface UserData {
  nombre: string;
  tipo: string;
  habilidad: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

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

  applyFilter(event: Event) {
    /* const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); */

    /* if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    } */
  }

  viewDetail(row) {
    this.dialog.open(VerDetalleComponent, {
      data: row
    });
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
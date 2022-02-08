import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';

  constructor( @Inject(MAT_DIALOG_DATA) 
               public data: any, 
               private favoritesService: FavoritesService,
               public dialogRef: MatDialogRef<VerDetalleComponent>, ) { 
                this.pokemon = data;
               }

  ngOnInit(): void {

  }

  addFavorites(id) {
    this.favoritesService.addFavorite(id);
    this.dialogRef.close('addFav');
  }

  close(){
    this.dialogRef.close('close');
  }

 
}

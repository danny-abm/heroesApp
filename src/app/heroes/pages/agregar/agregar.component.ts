import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      
    `
  ]
})
export class AgregarComponent implements OnInit {

 

  publishers=[
    {
      id:'DC Comics',
      description:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      description:'Marvel - Comics'
    }
  ];

  heroe: Heroes={
    superhero:  '',
    publisher: Publisher.DCComics,
    alter_ego:  '',
    first_appearance: '',
    characters: '',
    alt_img:  '',
    avatar_img:  ''

  };

  constructor(private activatedRoute:ActivatedRoute,
              private heroesService: HeroesService,
              private router:Router,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      //si no se encuentra en editar no trata de obtener el id de la ruta
      return;
     }
      this.activatedRoute.params
        .pipe(
          switchMap( ({id})=> this.heroesService.getHeroesId(id) )
        )
        .subscribe(heroesResp=>this.heroe=heroesResp)
      }
 

  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }


    if(this.heroe.id){//si tiene id activa la peticion put para editar

      this.heroesService.updateHeroe(this.heroe)
       .subscribe(heroeResp => this.mostrarSnackBar('Héroe Editado')
         );

         

    }
    else{//de otra manera crea el nuevo heroe
    this.heroesService.createHeroe(this.heroe)  //para que envie directo al panel de editar
    .subscribe(heroeResp => {this.router.navigate(['/heroes/editar', heroeResp.id])
                            this.mostrarSnackBar('Héroe Guardado')
    });

      
      
    }

  }

  eliminar(){
      const dialog = this.matDialog.open(ConfirmarComponent, {
                      width: '250px',
                      data:this.heroe
                    });
      //suscribiendose al boton borrar del dialog
      dialog.afterClosed().subscribe( (result) =>{

        if(result){//si se da borrar dispara la funcion delete del servicio

          this.heroesService.deleteHeroe(this.heroe)
          .subscribe(heroeResp => {
            this.router.navigate(['/heroes/listado'])
            this.mostrarSnackBar('Héroe Eliminado')
        } );

        }

      });

   

  

      
  }
   mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,'OK',{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:2500,
    });
   }

   mostrarDialog(){
    
   }

}

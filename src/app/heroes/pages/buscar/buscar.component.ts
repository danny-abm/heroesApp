import { Component, OnInit } from '@angular/core';import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string= '';
  heroes: Heroes[]=[];
  heroeSeleccionado: Heroes | undefined;



  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscar(query:string){
    
    this.heroesService.getSugerencias(query.trim())
    .subscribe(heroesResp=>{
      this.heroes=heroesResp;
    });

  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    
    
    if(!event.option.value){//si el valor de  la opcion no existe o es vacia no hace nada
     this.heroeSeleccionado = undefined;
      console.log(event.option.value);
      return;
    }
    
    //si la opcion seleccionada existe se muestra el heroe en el input y hace busqueda por el id de la seleccion
      const heroe:Heroes = event.option.value;
      this.termino=heroe.superhero;
      this.heroesService.getHeroesId(heroe.id!)
        .subscribe(heroeResp => this.heroeSeleccionado=heroeResp
          )
    
  }
  

}

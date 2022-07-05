import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width:95%;
    }
    
    `
  ]
})
export class HeroeComponent implements OnInit {

   heroe!: Heroes;

  constructor( private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe( //OBTIENE EL PARAMETRO DE LA RUTA O URL Y LO ASIGNA A OTRO OBSERBABLE(LA FUNCION DE GETHEROESID)
      switchMap( ({id}) => this.heroesService.getHeroesId(id) )
      )
    .subscribe(
      heroeResponse=> console.log(this.heroe=heroeResponse)
      
      //({id})=> console.log(id)  OBTENER ID DEL PARAMS DE LA URL Y MOSTRARLO EN CONSOLA
      );
  }

}



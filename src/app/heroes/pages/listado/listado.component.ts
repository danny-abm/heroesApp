import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  heroesList: Heroes[]=[];

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( heroes=>{
        this.heroesList=heroes;
      });
  }



}

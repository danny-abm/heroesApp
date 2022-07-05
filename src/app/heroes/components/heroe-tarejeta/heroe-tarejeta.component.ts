import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarejeta',
  templateUrl: './heroe-tarejeta.component.html',
  styles: [
  ]
})
export class HeroeTarejetaComponent implements OnInit {

  @Input() heroe!: Heroes ;


  constructor() { }

  ngOnInit(): void {
  }

}

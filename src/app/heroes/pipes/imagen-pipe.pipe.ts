import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {

  transform(value:Heroes): string {
    if(!value.id?.includes('marvel') && !value.id?.includes('dc')  && !value.alt_img){

      return `assets/super-profile.png`;

    }
    else if(value.alt_img){

      return value.alt_img;
      
    } else{

      return `assets/heroes/${value.id}.jpg`;

    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'avatar'
})
export class avatarPipe implements PipeTransform {

  transform(value:Heroes): string {
    
    
    if(!value.id?.includes('marvel') && !value.id?.includes('dc')  && !value.avatar_img){

      return `assets/super-profile.png`;

    }
     if(value.avatar_img){

      return value.avatar_img;
      
    } else{
    return `assets/heroePerfil/${value.id}.jpeg`;
    }
  }

}

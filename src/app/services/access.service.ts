import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AccessService {


  // auth="autorizado";

  constructor(private router:Router) { }


  accessoPassword(id: string){
    if(id=='unknown'){
      return;
    }else{

      localStorage.setItem('id',id);
      // localStorage.setItem('token',this.auth);
      // location.href = '#/deteccion';
      this.router.navigate(['deteccion']);
      location.reload();
    }
  }
}

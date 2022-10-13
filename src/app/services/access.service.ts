import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessService {


  auth="autorizado";

  constructor() { }


  accessoPassword(id: string){
    if(id=='unknown'){
      return;
    }else{

      localStorage.setItem('id',id);
      localStorage.setItem('token',this.auth);
      location.href='deteccion';
    }
  }
}

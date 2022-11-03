import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { string } from '@tensorflow/tfjs-core';
import { environment } from 'src/environments/environment';
import { alumno } from '../models/alumno';
import { docente } from '../models/docente';

const URL = environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }



  usuarioData(id:string){

    return this.http.get(`${URL}/imagen/${id}`)
  }

  // login(id:string, formData:alumno){

  //   return this.http.post(`${URL}/auth/${id}`, formData);

  // }

  login(email:any,pass:any){
    return this.http.get<docente>(`${URL}/auth/${email}/${pass}`);
  }

}


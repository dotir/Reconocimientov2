import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { string } from '@tensorflow/tfjs-core';
import { environment } from 'src/environments/environment';
import { alumno } from '../models/alumno';
import { curso } from '../models/curso';
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

  login(email:any,pass:any){
    return this.http.get<docente>(`${URL}/auth/${email}/${pass}`);
  }

  registroDocente(docente:any){
    return this.http.post(`${URL}/docente`,docente);
  }

  vercursos(id:any){
    return this.http.get<curso>(`${URL}/curso/${id}`);
  }

  insertarCurso(curso:any){
    return this.http.post(`${URL}/curso`,curso);
  }

  entrarcurso(codigo:any){
    return this.http.get<curso>(`${URL}/curso/curso/${codigo}`);
  }
}


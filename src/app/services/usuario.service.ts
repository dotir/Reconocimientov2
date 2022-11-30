import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { string } from '@tensorflow/tfjs-core';
import { environment } from 'src/environments/environment';
import { alumno } from '../models/alumno';
import { curso } from '../models/curso';
import { docente } from '../models/docente';
import { ingresante } from '../models/ingresante';

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

  actualizarDocente(id:any,docente:any){
    return this.http.put(`${URL}/docente/${id}`,docente);
  }

  vercursos(id:any){
    return this.http.get<curso>(`${URL}/curso/${id}`);
  }

  insertarCurso(curso:any){
    return this.http.post(`${URL}/curso`,curso);
  }
  actualizarCurso(id:any,curso:any){
    return this.http.put(`${URL}/curso/${id}`,curso);
  }

  entrarcurso(codigo:any){
    return this.http.get<curso>(`${URL}/curso/curso/${codigo}`);
  }

  enviocorre(correo:any){
    return this.http.post(`${URL}/correo`,correo);
  }

  validarclave(codigo:any,clave:any){
    return this.http.get<curso>(`${URL}/curso/clave/${codigo}/${clave}`);
  }

  traerdatosdocente(id:any){
    return this.http.get<docente>(`${URL}/docente/${id}`);
  }

  veringresantes(id:any){
    return this.http.get<ingresante>(`${URL}/ingresantes/${id}`);
  }

  insertaringresantes(ingresantes:any){
    return this.http.post(`${URL}/ingresantes`,ingresantes);
  }

  estadoingresoporclave(idingresante:any,idcurso:any){
    return this.http.get(`${URL}/ingresantes/estadoclave/${idingresante}/${idcurso}`);
  }
}


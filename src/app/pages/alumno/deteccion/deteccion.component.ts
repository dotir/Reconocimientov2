import { Component, OnInit } from '@angular/core';
/* import {ngForm} from '@angular/forms'; */
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

const URL = environment.urlServer;

@Component({
  selector: 'app-deteccion',
  templateUrl: './deteccion.component.html',
  styleUrls: ['./deteccion.component.css']
})
export class DeteccionComponent implements OnInit {

  idUser:any;
  image:any;
  imagenUsuario:any;
  imgNombre:any;
  imgFoto:any;


  usuario={
    password:''
  }

  constructor(private UsuarioSvc:UsuarioService) { }

  ngOnInit() {

    this.obtenerImg();

  }

  //obtener datos imagen
  obtenerImg(){

    this.idUser = localStorage.getItem('id');
    this.UsuarioSvc.usuarioData(this.idUser).subscribe(res=>{

        this.image = res;
        this.imgNombre=this.image.Nombre;

        this.imagenUsuario = `${URL}/${this.image.Foto}`;
    });

  }

  volver(){

    localStorage.removeItem('id');
    location.href = '/identificar';

  }

  evaluacion(){
    location.href = '/evaluacion3';
  }

}

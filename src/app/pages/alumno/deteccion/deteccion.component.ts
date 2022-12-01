import { Component, OnInit } from '@angular/core';
import { ingresa } from 'src/app/models/ingresa';
/* import {ngForm} from '@angular/forms'; */
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
  ingresa:ingresa={
    idalumno:'',
    idcurso:'',
    Estado:'',
    EstadoIngreso:''
  }
  idcurso:any;

  constructor(private UsuarioSvc:UsuarioService, private usuSvc:UsuarioService) { }

  ngOnInit() {
    this.idcurso = JSON.parse(localStorage.getItem('cursoe')!);

    this.ingresa.idalumno=this.idcurso[0].idalumno;
    this.ingresa.idcurso=this.idcurso[0].idalumno;
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
    location.href = '#/identificar';

  }

  evaluacion(){
    Swal.fire({

      icon: 'success',
      title: 'Ingreso correcto',
      text: 'Ingreso correctamente a la evaluacion'
    }).then(() => {
      this.usuSvc.insertaringresantes(this.ingresa).subscribe(()=>{
        console.log('inserta correctamente');
        localStorage.removeItem('cursoe');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        location.href = '#/home';
      })


    })
  }

}

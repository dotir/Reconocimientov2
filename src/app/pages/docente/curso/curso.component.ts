import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { curso } from 'src/app/models/curso';
import { UsuarioService } from 'src/app/services/usuario.service';
import swettalert from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  iddocente:any;
  cursoNuevo:curso={
    Nombre:'',
    Docente_idDocente:'',
    Descripcion:'',
    Codigo:''
  }

  constructor(private router:Router,private usuarioServ:UsuarioService) { }

  ngOnInit(): void {
    this.iddocente=JSON.parse(localStorage.getItem('id')!);
  }


  goregistro(){
    this.cursoNuevo.Docente_idDocente=this.iddocente.idDocente;

    this.usuarioServ.insertarCurso(this.cursoNuevo).subscribe(res=>{
      swettalert.fire(
        'Registrado!',
        'Has click para continuar!',
        'success'
      ).then(()=>{
        this.router.navigate(['menu']);
    })
     });
  }

  atras(){
    this.router.navigate(['menu']);
  }
}

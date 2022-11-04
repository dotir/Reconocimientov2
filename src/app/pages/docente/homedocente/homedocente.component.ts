import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { curso } from 'src/app/models/curso';
import { docente } from 'src/app/models/docente';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-homedocente',
  templateUrl: './homedocente.component.html',
  styleUrls: ['./homedocente.component.css']
})
export class HomedocenteComponent implements OnInit {

  NombreDocente:any;
  cursos:any=[];
  cursoData:curso[] =[];

  constructor(private usuaServ:UsuarioService) { }

  ngOnInit(): void {
    this.NombreDocente= JSON.parse(localStorage.getItem('id')!);
    this.usuaServ.vercursos(this.NombreDocente.idDocente).subscribe((res:curso)=>{
      this.cursos=res;
      this.cursos.forEach((element: curso) => {
        this.cursoData.push({
          ...element
        })
      })
    })
  }
  gocrearCurso(){
    location.href = '#/curso';
  }
  goRAlumno(){
    location.href='#/upload';
  }
  godashbord(){
    location.href='#/dash';
  }
}

import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usuaServ:UsuarioService,private router:Router) { }

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
    this.router.navigate(['curso']);
  }
  goRAlumno(){
    this.router.navigate(['upload']);
  }
  godashbord(id:any){
    localStorage.removeItem('curso');
    localStorage.setItem('curso',JSON.stringify(this.cursos[id]));
    this.router.navigate(['dash']);
  }
}

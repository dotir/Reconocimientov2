import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { curso } from 'src/app/models/curso';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  iddocente:any;
  cursos:any=[];
  cursoData:curso[] =[];
  @Input() varaalumno = '';

  constructor( private router:Router,private usuarioServ:UsuarioService) { }

  ngOnInit(): void {

    this.iddocente=JSON.parse(localStorage.getItem('id')!);
    this.usuarioServ.vercursos(this.iddocente.idDocente).subscribe((res:curso)=>{
      this.cursos=res;
      this.cursos.forEach((element: curso) => {
        this.cursoData.push({
          ...element
        })
      })
    })
  }

  goRAlumno(){
    this.router.navigate(['upload']);
  }
  godashbord(i:any){
    localStorage.removeItem('curso');
    localStorage.setItem('curso',this.cursos[i].Nombre);
    this.router.navigate(['dash']);
  }
  gomenu(){
    this.router.navigate(['menu']);
  }
  salir(){
    localStorage.clear();
    // localStorage.removeItem('id');
    this.router.navigate(['home']);
  }
}

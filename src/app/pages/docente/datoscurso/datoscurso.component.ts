import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { curso } from 'src/app/models/curso';
import { UsuarioService } from 'src/app/services/usuario.service';
import sweet from 'sweetalert2'
@Component({
  selector: 'app-datoscurso',
  templateUrl: './datoscurso.component.html',
  styleUrls: ['./datoscurso.component.css']
})
export class DatoscursoComponent implements OnInit {
  cursos:any;
  cursoData:curso ={
    idCurso:'',
    Nombre:'',
    Docente_idDocente:'',
    Descripcion:'',
    Codigo:'',
    Clave:''
  }

  constructor(private route: ActivatedRoute,private usuaSvc:UsuarioService) { }

  ngOnInit(): void {
    this.cursos=JSON.parse(localStorage.getItem('curso')!);
    this.cursoData=this.cursos;
    console.log(this.cursos);
  }

  Actualizar(){
    this.usuaSvc.actualizarCurso(this.cursos.idCurso,this.cursoData).subscribe(()=>{
      sweet.fire({
        title: 'Update',
        text: 'Actualizo correctamente'
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { curso } from 'src/app/models/curso';
import { UsuarioService } from 'src/app/services/usuario.service';
import swet from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  codigo:any;
  cursos: any = []
  constructor(private router:Router, private usuarioSrv:UsuarioService) { }

  ngOnInit(): void {
  }

  goidentificar(){
    this.usuarioSrv.entrarcurso(this.codigo).subscribe((res)=>{
      this.cursos = res;
      if(this.cursos.length==0){
        swet.fire({
          icon: 'error',
          title: 'Codigo curso no encontrado.',
          text: 'Parece que no ingresaste un codigo de curso incorrecto!',
        })
      } else {
        swet.fire(
          'Bienvenido!',
          'Has click para continuar!',
          'success'
        ).then(() => {
          let ida = JSON.stringify(res);
          localStorage.setItem('cursoe', ida);
          this.router.navigate(['identificar']);
        })

      }

    })
    // this.router.navigate(['identificar']);
  }
}

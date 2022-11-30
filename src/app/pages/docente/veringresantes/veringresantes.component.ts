import { Component, OnInit } from '@angular/core';
import { ingresante } from 'src/app/models/ingresante';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const URL = environment.urlServer;
@Component({
  selector: 'app-veringresantes',
  templateUrl: './veringresantes.component.html',
  styleUrls: ['./veringresantes.component.css']
})
export class VeringresantesComponent implements OnInit {

  urls=URL;
  cursosid:any;
  ingresantes:any = [];
  ingresantesData:ingresante[] = [];


  constructor(private ususv:UsuarioService) { }

  ngOnInit(): void {
    this.cursosid=JSON.parse(localStorage.getItem('curso')!);
    this.ususv.veringresantes(this.cursosid.idCurso).subscribe((res)=>{
      this.ingresantes=res;
      this.ingresantesData=[];
      this.ingresantes.forEach((element:ingresante)=>{
        this.ingresantesData.push({
          ...element
        })
      })
    })
  }

  estadoxclave(ingresante:any){
    this.cursosid=JSON.parse(localStorage.getItem('curso')!);

    this.ususv.estadoingresoporclave(ingresante,this.cursosid.idCurso).subscribe(()=>{
      Swal.fire("Se cambio estado correctamente");
    },(err)=>{
      Swal.fire("Ocurrio un error");
    })
  }
}

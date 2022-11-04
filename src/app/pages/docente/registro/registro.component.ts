import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { docente } from 'src/app/models/docente';
import { UsuarioService } from 'src/app/services/usuario.service';
import swettalert from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  docentenuevo:docente={
    Nombre:'',
    Apellido:'',
    Email:'',
    Password:''
  }

  constructor(private router:Router,private usuServ:UsuarioService) { }

  ngOnInit(): void {
  }
  gologin(){
    this.usuServ.registroDocente(this.docentenuevo).subscribe(res=>{
      swettalert.fire(
        'Registrado!',
        'Has click para continuar!',
        'success'
      ).then(()=>{
        this.router.navigate(['login']);
      })
    })

  }
  gohome(){
    this.router.navigate(['home'])
  }
}

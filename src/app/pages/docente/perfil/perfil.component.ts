import { Component, OnInit } from '@angular/core';
import { docente } from 'src/app/models/docente';
import { UsuarioService } from 'src/app/services/usuario.service';
import sweet from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  pefdocente:docente={
    idDocente:'',
    Nombre:'',
    Apellido:'',
    Email:'',
    Password:''
  }
  idocente:any;

  constructor(private usuarioSvc:UsuarioService) { }

  ngOnInit(): void {
    this.idocente=JSON.parse(localStorage.getItem('id')!);
    this.pefdocente=this.idocente;
  }
  Actualizar(){
    this.usuarioSvc.actualizarDocente(this.idocente.idDocente,this.pefdocente).subscribe(()=>{
      sweet.fire({
        title: 'Update',
        text: 'Actualizo correctamente'
      })
    })
  }




}

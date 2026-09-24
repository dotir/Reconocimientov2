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
    // limpiar la clave que versiones anteriores guardaban en localStorage
    if (this.idocente && 'Password' in this.idocente) {
      delete this.idocente.Password;
      localStorage.setItem('id', JSON.stringify(this.idocente));
    }
    // Password vacio = el backend mantiene la clave actual
    this.pefdocente={ ...this.idocente, Password: '' };
  }
  Actualizar(){
    this.usuarioSvc.actualizarDocente(this.idocente.idDocente,this.pefdocente).subscribe(()=>{
      const { Password, ...datos } = this.pefdocente;
      localStorage.setItem('id', JSON.stringify(datos));
      this.pefdocente.Password='';
      sweet.fire({
        title: 'Update',
        text: 'Actualizo correctamente'
      })
    })
  }




}

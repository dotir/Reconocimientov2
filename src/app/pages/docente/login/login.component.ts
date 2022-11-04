import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { string } from '@tensorflow/tfjs-core';
import { UsuarioService } from 'src/app/services/usuario.service';
import swettalert from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any;
  pass: any;
  usuarios: any = []

  constructor(private usuaServ: UsuarioService,private router:Router) { }

  ngOnInit(): void {
  }

  gomenuD() {

    if (this.usuario === '') {
      swettalert.fire({
        icon: 'error',
        title: 'Error login.',
        text: 'Parece que no ingreso datos!',
      })
      if (this.pass === '') {
        swettalert.fire({
          icon: 'error',
          title: 'Error login.',
          text: 'Parece que no ingreso datos!',
        })
      }
    } else {
      this.usuaServ.login(this.usuario, this.pass).subscribe(res => {
        this.usuarios = res;
        if (this.usuarios.length == 0) {
          swettalert.fire({
            icon: 'error',
            title: 'Error login.',
            text: 'Parece que no estas registrado o ingrese mal sus datos!',
          })
        } else {
          swettalert.fire(
            'Bienvenido!',
            'Has click para continuar!',
            'success'
          ).then(() => {
            let ida = JSON.stringify(this.usuarios[0]);
            localStorage.setItem('id', ida);
            this.router.navigate(['menu']);
          })

        }
      })
    }
  }

  goregistro() {



    location.href = '#/registro'
  }

}

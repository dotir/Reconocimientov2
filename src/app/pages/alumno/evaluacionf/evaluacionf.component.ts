import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { envio } from 'src/app/models/envio';
import { UsuarioService } from 'src/app/services/usuario.service';
const URL = environment.urlServer;
import swettalert from 'sweetalert2';
import { docente } from 'src/app/models/docente';
import { Router } from '@angular/router';
import { curso } from 'src/app/models/curso';

@Component({
  selector: 'app-evaluacionf',
  templateUrl: './evaluacionf.component.html',
  styleUrls: ['./evaluacionf.component.css']
})
export class EvaluacionfComponent implements OnInit {

  curso: any;
  cursos=[];
  correo: envio = {
    correo: '',
    NombreCurso: '',
    NombreAlumno: '',
    idDocente: '',
    correoDocente: ''
  }
  docentes: any;


  constructor(private http: HttpClient, private usuarioServ: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.curso = JSON.parse(localStorage.getItem('cursoe')!);
  }
  Enviar() {
    localStorage.clear();
    location.href = '/home';
  }
  obtieneEmail(correo: any, nombreu: any) {
    this.correo.NombreCurso = this.curso[0].Nombre;
    this.correo.idDocente = this.curso[0].Docente_idDocente;
    this.correo.correo = correo.value;
    this.correo.NombreAlumno = nombreu.value;


    this.usuarioServ.traerdatosdocente(this.curso[0].Docente_idDocente).subscribe((res) => {
      this.docentes = res;
      this.correo.correoDocente = this.docentes.Email;
      this.usuarioServ.enviocorre(this.correo).subscribe(res => {
        swettalert.fire('Se comunico al docente del ingreso fallido').then(() => {
          // location.reload();
        });
        this.usuarioServ.traerdatosdocente(this.curso[0].Docente_idDocente).subscribe((res) => {
          this.docentes = res;
          this.correo.correoDocente = this.docentes[0].Email;
          this.usuarioServ.enviocorre(this.correo).subscribe(res => {
            swettalert.fire('Se comunico al docente del ingreso fallido').then(() => {
              console.log('correcto')
              //localStorage.clear();
              //location.href = '/home';
              //location.reload();
            });
          })
        })

      })

    })

  }

  async ingresoxclave(){
    const { value: password } = await swettalert.fire({
      title: 'Ingrese la clave de acceso',
      input: 'password',
      inputPlaceholder: 'Ingrese la clave',
    })

    if (password) {
      this.usuarioServ.validarclave(this.curso[0].Codigo,password).subscribe((res)=>{
        const validador = JSON.stringify(res);
        if(validador!='[]'){
          swettalert.fire(`Ingreso correcto`)
          location.href='#/home'
        }
        else{
          swettalert.fire(`Clave Incorrecta`)
        }
      })
      // swettalert.fire(`Clave: ${password}`)
    }
  }

}

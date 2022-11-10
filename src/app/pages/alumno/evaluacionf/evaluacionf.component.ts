import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { envio} from 'src/app/models/envio';
const URL = environment.urlServer;

@Component({
  selector: 'app-evaluacionf',
  templateUrl: './evaluacionf.component.html',
  styleUrls: ['./evaluacionf.component.css']
})
export class EvaluacionfComponent implements OnInit {

  curso:any;
  correo:envio ={
    correo:'',
    NombreCurso:'',
    idDocente:''
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.curso=JSON.parse(localStorage.getItem('cursoe')!);
    // console.log(this.curso[0].idCurso)
    // console.log(this.curso[0].Docente_idDocente)
  }


  obtieneEmail(correo:any){

    this.correo.NombreCurso=this.curso[0].Nombre;
    this.correo.idDocente=this.curso[0].Docente_idDocente;
    this.correo.correo=correo.value;

    console.log(correo.value);
    console.log(this.correo);

    this.http.post(`${URL}/correo`,this.correo).subscribe(res=>{
      console.log(res)
    })

    location.reload();

  }

}

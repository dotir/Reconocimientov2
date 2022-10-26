import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.urlServer;

@Component({
  selector: 'app-evaluacionf',
  templateUrl: './evaluacionf.component.html',
  styleUrls: ['./evaluacionf.component.css']
})
export class EvaluacionfComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  obtieneEmail(correo:any){

    const clave= "12345"
    console.log(correo.value);
    this.http.get<any>(`${URL}/correo/${correo.value}/${clave}`).subscribe(res=>{
      console.log(res)
    })

    location.reload();

  }

}

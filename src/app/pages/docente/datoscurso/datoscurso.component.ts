import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { curso } from 'src/app/models/curso';

@Component({
  selector: 'app-datoscurso',
  templateUrl: './datoscurso.component.html',
  styleUrls: ['./datoscurso.component.css']
})
export class DatoscursoComponent implements OnInit {
  cursos:any;
  curso:any = [];
  idcurso:any;
  cursoData:curso[] =[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cursos=JSON.parse(localStorage.getItem('curso')!);
    console.log(this.cursos);
  }

}

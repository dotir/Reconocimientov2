import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { curso } from 'src/app/models/curso';

@Component({
  selector: 'app-dashbordcurso',
  templateUrl: './dashbordcurso.component.html',
  styleUrls: ['./dashbordcurso.component.css']
})
export class DashbordcursoComponent implements OnInit {

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

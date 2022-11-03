import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { docente } from 'src/app/models/docente';

@Component({
  selector: 'app-homedocente',
  templateUrl: './homedocente.component.html',
  styleUrls: ['./homedocente.component.css']
})
export class HomedocenteComponent implements OnInit {

  NombreDocente:any;

  constructor() { }

  ngOnInit(): void {
    this.NombreDocente= JSON.parse(localStorage.getItem('id')!);
    console.log(this.NombreDocente);
  }
  gocrearCurso(){
    location.href = '#/curso';
  }
  goRAlumno(){
    location.href='#/upload';
  }
}

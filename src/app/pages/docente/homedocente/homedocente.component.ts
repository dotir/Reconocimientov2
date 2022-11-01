import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homedocente',
  templateUrl: './homedocente.component.html',
  styleUrls: ['./homedocente.component.css']
})
export class HomedocenteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  gocrearCurso(){
    location.href = '#/curso';
  }
  goRAlumno(){
    location.href='#/upload';
  }
}

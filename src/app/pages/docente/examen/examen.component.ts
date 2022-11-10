import { Component, OnInit } from '@angular/core';
import { examen } from 'src/app/models/examen';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  examenNuevo:examen ={
    Nombre:'',
    Codigo:'',
    Duracion:'',
    Curso_idCurso:''
  }

  constructor() { }

  ngOnInit(): void {
  }

  gohome(){

  }

  goCrear(){

  }
}

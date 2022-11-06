import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goidentificar(){
    this.router.navigate(['identificar']);
  }
}

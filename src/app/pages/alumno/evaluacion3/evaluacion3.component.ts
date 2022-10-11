import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluacion3',
  templateUrl: './evaluacion3.component.html',
  styleUrls: ['./evaluacion3.component.css']
})
export class Evaluacion3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  salirexamen(){
    localStorage.removeItem('id');
    location.href = '/home';
  }
}

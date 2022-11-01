import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gomenuD(){
    location.href = '#/menu';
  }

  goregistro(){
    location.href = '#/registro'
  }

}

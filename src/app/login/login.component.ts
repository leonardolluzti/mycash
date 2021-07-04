import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = '#19472a';
  }

  registerUser(){
    this.router.navigate(['/cadastrar-usuario']);
  }
  recuperarSenha(){
    this.router.navigate(['/recuperar-senha']);
  }
}

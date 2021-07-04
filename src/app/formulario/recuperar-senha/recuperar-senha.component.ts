import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = '#fff';
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }

  
}

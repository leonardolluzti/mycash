import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = '#19472a';
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }
}

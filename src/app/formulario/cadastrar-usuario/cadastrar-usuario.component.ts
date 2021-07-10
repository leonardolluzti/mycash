import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit, OnDestroy {

  constructor( private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = '#3D414C';
  }

  ngOnDestroy() {
    document.querySelector('html').style.background = 'none';
  }


  backToLogin(){
    this.router.navigate(['/login']);
  }
}

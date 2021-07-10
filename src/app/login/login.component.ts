import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = '#19472a';
  }
  ngOnDestroy() {
    document.querySelector('html').style.background = 'none';
  }

  login(){
    if(this.loginForm.valid){
      localStorage.setItem('token', 'paodeloquedancatangonasiberia');
      this.router.navigate(['/dashboard']);
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha corretamente todos os campos!'       
      })
    }
  }
  registerUser(){
    this.router.navigate(['/cadastrar-usuario']);
  }
  recuperarSenha(){
    this.router.navigate(['/recuperar-senha']);
  }
}

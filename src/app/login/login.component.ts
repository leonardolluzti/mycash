import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Authentication, User } from '../model/user';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authentication: Authentication;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = '#19472a';
  }
  ngOnDestroy() {
    document.querySelector('html').style.background = 'none';
  }

  login(){
    if(this.loginForm.valid){
    this.authentication = this.loginForm.value;
    this.loginService.authentication(this.authentication).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data);
        localStorage.setItem('username', this.authentication.username);
        localStorage.setItem('password', this.authentication.password);
        this.router.navigate(['/dashboard']);
      }
    );
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha corretamente todos os campos!'       
      });
    }



    /*
    if(this.loginForm.valid){
      localStorage.setItem('token', 'paodeloquedancatangonasiberia');
      this.router.navigate(['/dashboard']);
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha corretamente todos os campos!'       
      })
    }*/
  }
  registerUser(){
    this.router.navigate(['/cadastrar-usuario']);
  }
  recuperarSenha(){
    this.router.navigate(['/recuperar-senha']);
  }
}

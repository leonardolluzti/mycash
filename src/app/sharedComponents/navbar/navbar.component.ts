import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.putEvents();
  }

  putEvents(){
    const menuList = document.getElementById('menu-list');
    const botaoMenuMobile = document.getElementById('botao-menu-mobile');
    
    botaoMenuMobile.addEventListener('click', function(){
      menuList.classList.toggle('active');
    });
    
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

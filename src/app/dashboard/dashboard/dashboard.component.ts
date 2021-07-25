import { Despesa } from './../../model/despesa';
import { Receita } from './../../model/receita';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  auxObject = {count: 100, data: []};
  listDespesas: Despesa[];
  listReceitas: Receita[];
  
  constructor() { }

  ngOnInit(): void {
    this.populateDespesas();
    this.populateReceitas();
  }
 
 populateDespesas(){
    for(let i = 0; i < this.auxObject.count; i++){
    this.auxObject.data.push({
      id: i,
      data: '2' + i + '/' + '12' + '/' + '20' + i,
      valor: 'R$ ' + i + i + i + i,
      tipo: 'ALUGUEL',
      descricao: 'caro, podendo ser maior que ' + i,
      fixo: true
    });
    this.listDespesas = this.auxObject.data;    
 }
    this.auxObject.data=[];
}
populateReceitas(){
    for(let i = 0; i < this.auxObject.count; i++){
    this.auxObject.data.push({
      id: i,
      data: '2' + i + '/' + '12' + '/' + '20' + i,
      valor: 'R$ ' + i + i + i + i,
      tipo: 'SALÁRIO',
      descricao: 'COM ADICIONAL DE R$ ' + i,
      fixo: true
    });
    this.listReceitas = this.auxObject.data;
  }
  this.auxObject.data=[];
}

}
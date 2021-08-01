import { Router } from '@angular/router';
import { ReceitaService } from './../../service/receitas/receita.service';
import { Despesa } from './../../model/despesa';
import { Receita } from './../../model/receita';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  auxObject = {count: 100, data: []};
  listDespesas: Despesa[];
  listReceitas: Receita[];
  
  
  constructor(private router: Router, public receitaService: ReceitaService) { }

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
      tipo: 'Salário',
      descricao: 'COM ADICIONAL DE R$ ' + i,
      fixo: true
    });
    this.listReceitas = this.auxObject.data;
  }
  this.auxObject.data=[];
}

edit(receita: Receita){
  console.log(receita);
  this.receitaService.getReceitaFromScreen(receita);
  this.router.navigate(['/receitas-form']);
}

delete(){
    Swal.fire({
    title: 'Você tem mesmo certeza?',
    text: 'Deseja mesmo deletar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if(result.isConfirmed){
      Swal.fire(
        'Deletado!',
        'Deletado com Sucesso.',
        'success'
      );
    }
  });

}

}
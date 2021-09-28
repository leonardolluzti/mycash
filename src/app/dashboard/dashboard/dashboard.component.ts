import { Router } from '@angular/router';
import { DespesaService } from './../../service/despesas/despesa.service';
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

  auxObject = {count: 31, data: []};
  listDespesas: Despesa[];
  listReceitas: Receita[];
  
  
  constructor(private router: Router, private receitaService: ReceitaService, private despesaService: DespesaService) { }

  ngOnInit(): void {
    this.populateDespesas();
    this.populateReceitas();
  }
 
 populateDespesas(){
  this.despesaService.getAllDespesas().subscribe(
    data => {
      console.log(data);
      this.listDespesas = data;
    }
  );
 /*//Preenchimento sem banco de dados
    for(let i = 1; i < this.auxObject.count; i++){
    this.auxObject.data.push({
      id: i,
      data: i + '/' + '04' + '/' + '2021',
      valor: 'R$ ' + i + i + '.00',
      tipo: 'Aluguel',
      descricao: 'caro, podendo ser maior que ' + i+ '.00',
      fixo: true
    });
    this.listDespesas = this.auxObject.data;    
 }
    this.auxObject.data=[];
*/
}
populateReceitas(){
  this.receitaService.getAllReceitas().subscribe(
    data => {
      console.log(data);
      this.listReceitas = data;
    }
  );
  /*//Preenchimento sem banco de dados
    for(let i = 1; i < this.auxObject.count; i++){
    this.auxObject.data.push({
      id: i,
      data: i + '/' + '04' + '/' + '2021',
      valor: 'R$ ' + i + i + '.00',
      tipo: 'Salário',
      descricao: 'COM ADICIONAL DE R$ ' + i+ '.00',
      fixo: true
    });
    this.listReceitas = this.auxObject.data;
  }
  this.auxObject.data=[];
  */
}

editReceita(receita: Receita){  
  this.receitaService.getReceitaFromScreen(receita);
  this.router.navigate(['/receitas-form']);
}
editDespesa(despesa: Despesa){
  this.despesaService.getDespesaFromScreen(despesa);
  this.router.navigate(['/despesas-form']);
}

deleteReceita(receita: Receita){
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
    if (result.isConfirmed) {
      this.receitaService.deleteReceitas(receita.id).subscribe(
        data => {
          console.log(data);
          Swal.fire(
            'Deletado!',
            'Deletado com Sucesso.',
            'success'
          );
        }
      );
    }
  });
}

deleteDespesa(despesa: Despesa){
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
    if (result.isConfirmed) {
      this.despesaService.deleteDespesas(despesa.id).subscribe(
        data => {
          console.log(data);
          Swal.fire(
            'Deletado!',
            'Deletado com Sucesso.',
            'success'
          );
        }
      );
    }
  });
}

}
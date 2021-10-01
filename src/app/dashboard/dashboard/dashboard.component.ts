import { Component, OnInit } from '@angular/core';
import { Despesa } from 'src/app/models/despesa';
import { Receita } from 'src/app/models/receita';
import { DespesaService } from 'src/app/service/despesas/despesa.service';
import { ReceitaService } from 'src/app/service/receitas/receita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //auxObject = {count: 100, data: []};
  listDespesas: Despesa[];
  listReceitas: Receita[];

  constructor(private receitaService: ReceitaService, private despesaService: DespesaService) { }

  ngOnInit(): void {
    this.populateDespesas();
    this.populateReceitas();
  }

  populateDespesas(){
    this.despesaService.getAllDespesas().subscribe(
      dataDesp => {
        console.log(dataDesp);
        this.listDespesas = dataDesp;
      }
    );
    
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
          dataDesp => {
            console.log(dataDesp);
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

  editDespesa(despesa: Despesa){
    this.despesaService.getDespesaFromScreen(despesa);
  }


  populateReceitas(){
    this.receitaService.getAllReceitas().subscribe(
      data => {
        console.log(data);
        this.listReceitas = data;
      }
    );
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

  editReceita(receita: Receita){
    this.receitaService.getReceitaFromScreen(receita);
  }

}

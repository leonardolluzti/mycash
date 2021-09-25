import { Tipo } from './../../model/util';
import { ReceitaService } from './../../service/receitas/receita.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {
  listTiposReceita: Tipo[]=[
    {value: '1', viewValue: 'Alimentos'},
    {value: '2', viewValue: 'Domicílio'},
    {value: '3', viewValue: 'Educação'},
    {value: '4', viewValue: 'Empréstimo'},
    {value: '5', viewValue: 'Lazer'},
    {value: '6', viewValue: 'Salário'},
    {value: '7', viewValue: 'Saúde'},
    {value: '8', viewValue: 'Trabalho'},
    {value: '9', viewValue: 'Transporte'},
    {value: '10', viewValue: 'Outros'},
  ];
startDate = new Date(1990,0,1);
formReceita = new FormGroup({
  data: new FormControl('',[Validators.required]),
  valor: new FormControl('',[Validators.required]),
  tipo: new FormControl('',[Validators.required]),
  descricao: new FormControl('',[Validators.required]),
  fixo: new FormControl('',[]),
});
  constructor( private router: Router, public receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.receitaService.botaoEdit.subscribe(edit => {
      console.log(edit);
      if (edit){
        this.formReceita.get('data').setValue(edit.data);
        this.formReceita.get('valor').setValue(edit.valor);
        this.formReceita.get('tipo').setValue(edit.tipo);
        this.formReceita.get('descricao').setValue(edit.descricao);
        this.formReceita.get('fixo').setValue(edit.fixo);
      }
    });
  }
  salvar(){
    if(this.formReceita.valid){
      Swal.fire({
        icon: 'success',
        title: 'Ebaaa!',
        text: 'Receita salva com sucesso!'        
      });    
      this.router.navigate(['/dashboard']);
    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Opaa!',
        text: 'Preencha corretamente todos os campos!'
      }); 
    }
  }
}

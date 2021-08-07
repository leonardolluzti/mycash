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
    {value: 'Alimentos', viewValue: 'Alimentos'},
    {value: 'Domicílio', viewValue: 'Domicílio'},
    {value: 'Educação', viewValue: 'Educação'},
    {value: 'Empréstimo', viewValue: 'Empréstimo'},
    {value: 'Lazer', viewValue: 'Lazer'},
    {value: 'Salário', viewValue: 'Salário'},
    {value: 'Saúde', viewValue: 'Saúde'},
    {value: 'Trabalho', viewValue: 'Trabalho'},
    {value: 'Transporte', viewValue: 'Transporte'},
    {value: 'Outros', viewValue: 'Outros'},
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

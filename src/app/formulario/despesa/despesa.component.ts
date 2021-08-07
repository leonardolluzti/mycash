import { DespesaService } from './../../service/despesas/despesa.service';
import { Tipo } from './../../model/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent implements OnInit { 
  listTiposDespesas: Tipo[]=[
    {value: 'Alimentos', viewValue: 'Alimentos'},
    {value: 'Domicílio', viewValue: 'Domicílio'},
    {value: 'Educação', viewValue: 'Educação'},
    {value: 'Empréstimo', viewValue: 'Empréstimo'},
    {value: 'Lazer', viewValue: 'Lazer'},
    {value: 'Saúde', viewValue: 'Saúde'},
    {value: 'Trabalho', viewValue: 'Trabalho'},
    {value: 'Transporte', viewValue: 'Transporte'},
    {value: 'Outros', viewValue: 'Outros'},
  ];
startDate = new Date(1990,0,1);
formDespesa = new FormGroup({
  data: new FormControl('',[Validators.required]),
  valor: new FormControl('',[Validators.required]),
  tipo: new FormControl('',[Validators.required]),
  descricao: new FormControl('',[Validators.required]),
  fixo: new FormControl('',[]),
});
  constructor( private router: Router, public despesaService: DespesaService) { }

  ngOnInit(): void {
    this.despesaService.botaoEdit.subscribe(edit => {
      console.log(edit);
      if (edit){
        this.formDespesa.get('data').setValue(edit.data);
        this.formDespesa.get('valor').setValue(edit.valor);
        this.formDespesa.get('tipo').setValue(edit.tipo);
        this.formDespesa.get('descricao').setValue(edit.descricao);
        this.formDespesa.get('fixo').setValue(edit.fixo);
      }
    });
  }
  salvar(){
    if(this.formDespesa.valid){
      Swal.fire({
        icon: 'success',
        title: 'Ebaaa!',
        text: 'Despesa salva com sucesso!'        
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

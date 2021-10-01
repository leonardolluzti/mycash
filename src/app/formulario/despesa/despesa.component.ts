import { Despesa } from 'src/app/models/despesa';
import { DespesaService } from './../../service/despesas/despesa.service';
import { Tipo } from './../../models/util';
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
    {value: '1', viewValue: 'Alimentos'},
    {value: '2', viewValue: 'Domicílio'},
    {value: '3', viewValue: 'Educação'},
    {value: '4', viewValue: 'Empréstimo'},
    {value: '5', viewValue: 'Lazer'},
    {value: '7', viewValue: 'Saúde'},
    {value: '8', viewValue: 'Trabalho'},
    {value: '9', viewValue: 'Transporte'},
    {value: '10', viewValue: 'Outros'},
  ];
startDate = new Date(1990,0,1);
formDespesa = new FormGroup({
  data: new FormControl('',[Validators.required]),
  valor: new FormControl('',[Validators.required]),
  tipo: new FormControl('',[Validators.required]),
  descricao: new FormControl('',[Validators.required]),
  fixo: new FormControl('',[Validators.required]),
});
  despesasObject: Despesa;

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
    if (this.formDespesa.valid && this.despesasObject === null){
      this.despesaService.createDespesas(this.formDespesa.value).subscribe(
        data => {
          console.log(data);
        }
      );      
      Swal.fire({
        icon: 'success',
        title: 'Ebaaa!',
        text: 'Despesa salva com sucesso!'        
      });    
      this.router.navigate(['/dashboard']);
    } else if (this.formDespesa.valid){
      const id = this.despesasObject.id;
      this.despesasObject = this.formDespesa.value;
      this.despesasObject.id = id;
      this.despesaService.updateDespesas(this.despesasObject).subscribe(
        data => {
          console.log(data);
        }
      );
    }
    /*
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
    
*/
  }
  update(){
    this.despesaService.updateDespesas(this.formDespesa.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
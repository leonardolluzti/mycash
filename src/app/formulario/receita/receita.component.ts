import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tipo } from 'src/app/models/util';
import { ReceitaService } from 'src/app/service/receitas/receita.service';
import { Receita } from 'src/app/models/receita';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {
  listTiposReceita: Tipo[] = [
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
  startDate = new Date(1990, 0, 1);
  formReceita = new FormGroup ({
    data: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    fixo: new FormControl('', []),
  });

  receitasObject: Receita;

  constructor(private router: Router, public receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.receitaService.botaoEdit.subscribe( edit => {
      console.log(edit);
      this.receitasObject = edit;
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
    if (this.formReceita.valid && this.receitasObject === null){
      this.receitaService.createReceitas(this.formReceita.value).subscribe(
        data => {
          console.log(data);
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Eeeeba...',
        text: 'Receita salva com sucesso'
       });
       this.router.navigate(['/dashboard']);       
    } else if (this.formReceita.valid){
      const id = this.receitasObject.id;
      this.receitasObject = this.formReceita.value;
      this.receitasObject.id = id;
      this.receitaService.updateReceitas(this.receitasObject).subscribe(
        data => {
          console.log(data);
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Eeeeba...',
        text: 'Receita salva com sucesso'
       });
       this.router.navigate(['/dashboard']);
    }else{
       Swal.fire({
         icon: 'warning',
         title: 'Oops...',
         text: 'Preencha corretamente todos os campos'
       });
    }
  }

  update(){
    this.receitaService.updateReceitas(this.formReceita.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}

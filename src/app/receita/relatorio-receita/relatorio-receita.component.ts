import { Router } from '@angular/router';
import { ReceitaService } from './../../service/receitas/receita.service';
import { Component, OnInit } from '@angular/core';
import { Receita } from './../../model/receita';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-receita',
  templateUrl: './relatorio-receita.component.html',
  styleUrls: ['./relatorio-receita.component.scss']
})
export class RelatorioReceitaComponent implements OnInit {
  auxObject = {count: 50, data: []};
  listReceitas: Receita[];

  constructor(public receitaService: ReceitaService, private router: Router) { }

  ngOnInit(): void {
    this.populateReceitas();
  }
  populateReceitas(){
    for(let i = 0; i < this.auxObject.count; i++){
    this.auxObject.data.push({
      id: i,
      data: '2' + '1' + '/' + '12' + '/' + '20' + i,
      valor: 'R$ ' + i + i + i + i,
      tipo: 'SALÁRIO',
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

// Gerador de pdf
public captureScreen(){
  const data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
    const imgWidth = 250;
    // const pageHeight = 250;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jspdf('p', 'mm', 'a4'); //A4 size page of PDF
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight);
    pdf.save('MYPdf.pdf'); //Generated PDF
  });
}

}

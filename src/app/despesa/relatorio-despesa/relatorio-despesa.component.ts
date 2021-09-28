import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from './../../model/despesa';
import { DespesaService } from 'src/app/service/despesas/despesa.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-despesa',
  templateUrl: './relatorio-despesa.component.html',
  styleUrls: ['./relatorio-despesa.component.scss']
})
export class RelatorioDespesaComponent implements OnInit {

  auxObject = {count: 31, data: []};
  listDespesas: Despesa[];

  constructor(public despesaService: DespesaService, private router: Router) { }

  ngOnInit(): void {
    this.populateDespesas();
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
      descricao: 'Caro mais de R$ ' + i+ '.00',
      fixo: true
    });
    this.listDespesas = this.auxObject.data;
  }
  this.auxObject.data=[];
  */
}

edit(despesa: Despesa){
  console.log(despesa);
  this.despesaService.getDespesaFromScreen(despesa);
  this.router.navigate(['/despesas-form']);
}

delete(despesa: Despesa){
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
    pdf.save('Relatório-Despesas.pdf'); //Generated PDF
  });
}

}

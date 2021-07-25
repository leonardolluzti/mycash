import { Component, OnInit } from '@angular/core';
interface Food{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {
  foods: Food[]=[
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

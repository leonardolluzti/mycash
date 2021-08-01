import { Receita } from './../../model/receita';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private edit = new BehaviorSubject<Receita>(null);
  botaoEdit = this.edit.asObservable();

  constructor() { }
  getReceitaFromScreen(receita: Receita){
    this.edit.next(receita);
  }
}

import { Despesa } from './../../model/despesa';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private edit = new BehaviorSubject<Despesa>(null);
  botaoEdit = this.edit.asObservable();

  constructor() { }
  
  getDespesaFromScreen(despesa: Despesa){
    this.edit.next(despesa);
  }
}

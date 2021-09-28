import { Despesa } from './../../model/despesa';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private edit = new BehaviorSubject<Despesa>(null);
  botaoEdit = this.edit.asObservable();
  username = localStorage.getItem("username");
  password = localStorage.getItem("password");
  
  constructor(private http: HttpClient, private router: Router) { }
  
  getDespesaFromScreen(despesa: Despesa){
    this.edit.next(despesa);
    this.router.navigate(['/despesas-form']);
  }

  getAllDespesas(){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.get<Despesa[]>('http://localhost:9000/despesa', {headers}).pipe(
      map(
        despesaLista =>{
          if(despesaLista){
            return despesaLista;
          }else{
            return [];
          }
          
        }
      )
    );
  }
  createDespesas(body: Despesa){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.post<Despesa>('http://localhost:9000/despesa', body, {headers}).pipe(
      map(
        despesaData =>{          
          return despesaData;                  
        }
      )
    );
  }

  updateDespesas(body: Despesa){
    const id = body.id;
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.put<Despesa>('http://localhost:9000/despesa/'+id, body, {headers}).pipe(
      map(
        despesaData =>{          
          return despesaData;                  
        }
      )
    );
  }

  deleteDespesas(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    
    return this.http.delete<Despesa>('http://localhost:9000/despesa/'+id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        despesaData =>{          
          return despesaData;                  
        }
      )
    );
  }

  findByData(){

  }
}

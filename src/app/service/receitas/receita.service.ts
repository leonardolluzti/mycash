import { Receita } from './../../model/receita';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private edit = new BehaviorSubject<Receita>(null);
  botaoEdit = this.edit.asObservable();
  
  username = localStorage.getItem("username");
  password = localStorage.getItem("password");
  
  constructor(private http: HttpClient, private router: Router) { }
  
  getReceitaFromScreen(receita: Receita){
    this.edit.next(receita);
    this.router.navigate(['/receitas-form']);
  }
  getAllReceitas(){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.get<Receita[]>('http://localhost:9000/receita', {headers}).pipe(
      map(
        receitaLista =>{
          if(receitaLista){
            return receitaLista;
          }else{
            return [];
          }
          
        }
      )
    );
  }
  createReceitas(body: Receita){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.post<Receita>('http://localhost:9000/receita', body, {headers}).pipe(
      map(
        receitaData =>{          
          return receitaData;                  
        }
      )
    );
  }

  updateReceitas(body: Receita){
    const id = body.id;
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.put<Receita>('http://localhost:9000/receita/'+id, body, {headers}).pipe(
      map(
        receitaData =>{          
          return receitaData;                  
        }
      )
    );
  }

  deleteReceitas(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    
    return this.http.delete<Receita>('http://localhost:9000/receita/'+id, {headers, responseType: 'text' as 'json'}).pipe(
      map(
        receitaData =>{          
          return receitaData;                  
        }
      )
    );
  }

  findByData(){

  }

}

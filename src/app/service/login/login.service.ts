import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authentication(auth: Authentication){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(auth.username + ':' + auth.password)});

    return this.http.get('http://localhost:9000/user/login', {headers, responseType: 'text' as 'text'}).pipe(
      map(
        authData => {
          console.log(authData);
          return authData;
        }
      )
    );
  }

}

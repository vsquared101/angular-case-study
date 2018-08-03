import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trustee } from './trustee.model';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TrusteeService {
  
  private url: string = 'http://localhost:3000/trustees';
  //private url: string = 'https://angular-demo-workspace-vivekvarma01.c9users.io:8081/trustees';
  //private url: string = 'assets/trustees.json';
  //private url1: string = 'assets/trustee.json';

  constructor(private http: HttpClient) { }

  getTrustees() {
    return this.http.get<Trustee[]>(this.url);
  }

  getTrusteeById(id: number) {
    return this.http.get<Trustee>(this.url + '/' + id);
    //return this.http.get(this.url1);
  }

  deleteTrustee(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  createTrustee(data: Trustee){
    return this.http.post<Trustee>(this.url, JSON.stringify(data), httpOptions);
  }
  
  updateTrustee(id: number, data: Trustee) {
    return this.http.put<Trustee>(this.url + '/' + id, JSON.stringify(data), httpOptions)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrusteeService {
  
  private url: string = 'http://localhost:3000/trustees';
  //private url: string = 'https://angular-demo-workspace-vivekvarma01.c9users.io:8081/trustees';

  constructor(private http: HttpClient) { }

  getTrustees() {
    return this.http.get(this.url);
  }

  getTrusteeById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  deleteTrustee(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  createTrustee(data){
    return this.http.post(this.url, JSON.stringify(data));
  }
}

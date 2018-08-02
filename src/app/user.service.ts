import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url: string = 'http://localhost:3000/users';
  //private url: string = 'https://angular-demo-workspace-vivekvarma01.c9users.io:8081/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }

  getUserById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  createUser(data){
    return this.http.post(this.url, JSON.stringify(data));
  }
}

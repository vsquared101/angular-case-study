import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  getUserById(id: number) {
    return this.http.get('http://localhost:3000/users/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:3000/users/' + id);
  }

  createUser(data){
    console.log(data);
  }
}

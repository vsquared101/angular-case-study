import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: any;

  constructor(private service: UserService) {

  }

  ngOnInit() {
    this.service.getUsers()
      .subscribe((data) => {
        this.users = data;
      });
  }

  deleteUser(id: number) {
    this.service.deleteUser(id)
      .subscribe((data) => {
        this.service.getUsers().subscribe((data) => this.users = data);
    });
  }
}

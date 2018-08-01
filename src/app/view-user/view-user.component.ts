import { Component, OnInit } from '@angular/core';
import { UserService  } from '../user.service';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  id: number;
  user: any;

  constructor(private service: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
      
    this.route.params.subscribe( params => {
      this.id = +params['id'];
      //console.log('id value passed is: ' + this.id);
      
      this.service.getUserById(this.id)
        .subscribe((data) => {
          this.user = data;
        });
    });
    
  }

}

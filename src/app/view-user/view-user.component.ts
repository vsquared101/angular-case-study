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
      console.log('id value passed is: ' + this.id);
      
      // TODO call getUserById method of the user service here to get particular user based on ID
      // set the above user object to a local 'user' variable to enable display of the fields within it.
      this.user = {
          "id": 1,
          "full_name": "Mr Charles Stewart",
          "short_name": "Charles Stewart",
          "ssn": "111222333",
          "dob": "10-10-1968",
          "gender": "Male",
          "marital_status": "Married",
          "citizenship": "United States",
          "country_of_residence": "Australia",
          "passport": "H1234567",
          "country_of_issuance": "Australia",
          "issuance_date": "15-04-2010",
          "expiration_date": "15-04-2020",
          "no_of_dependents": 2
      };
    });
    
  }

}

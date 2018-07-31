import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id: number;
  user: any;
  userForm: FormGroup;
  ssnPattern: string = '^[0-9]{9}$';
  passportPattern: string = '^[a-zA-Z]{1}[0-9]{7}$';

  constructor(private service: UserService, private route: ActivatedRoute, fb: FormBuilder) { 
  
    this.userForm = fb.group({
      'prefix': ['', Validators.required],
      'firstname': ['', Validators.required],
      'middlename': [''],
      'lastname': ['', Validators.required],
      'shortname': ['', Validators.required],
      'ssn': ['', [Validators.required, Validators.pattern(this.ssnPattern)]],
      'gender': ['', Validators.required],
      'countryOfResidence': ['', Validators.required],
      'passport': ['', [Validators.required, Validators.pattern(this.passportPattern)]],
      'countryOfIssuance': ['', Validators.required],
      'issuanceDate' : [''],
      'expirationDate' : [''],
      'noOfDependents' : [''],
      'maritalStatus' : ['']
    });
  }


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
  
  updateUserRecord(data) {
    console.log(data);
  }

}

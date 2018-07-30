import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  ssnPattern: string = '^[0-9]{9}$';

  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      'prefix': ['', Validators.required],
      'firstname': ['', Validators.required],
      'middlename': [''],
      'lastname': ['', Validators.required],
      'shortname': ['', Validators.required],
      'ssn': ['', [Validators.required, Validators.pattern(this.ssnPattern)]],
      'gender': ['', Validators.required],
      'countryOfResidence': ['', Validators.required],
      'passport': ['', Validators.required],
      'countryOfIssuance': ['', Validators.required],
      'issuanceDate' : [''],
      'expirationDate' : [''],
      'noOfDependents' : [''],
      'maritalStatus' : ['']
    });
    
  }

  ngOnInit() {
  }
  
  createUserRecord(data) {
    console.log(data);
  }

}

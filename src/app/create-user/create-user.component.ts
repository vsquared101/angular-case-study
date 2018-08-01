import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ValidateDropDownDefault } from '../validators/dropdown.default.validator';
import { UserService  } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  ssnPattern: string = '^[0-9]{9}$';
  passportPattern: string = '^[a-zA-Z]{1}[0-9]{7}$';
  noOfDependentsPattern: string = '^[0-9]+$';
  dateFormat: string = '^[0-9]{2}-[0-9]{2}-[0-9]{4}$';
  user: any;

  constructor(fb: FormBuilder, private service: UserService) {
    this.userForm = fb.group({
      'prefix': ['Please select...', [Validators.required, ValidateDropDownDefault]],
      'firstname': ['', Validators.required],
      'middlename': [''],
      'lastname': ['', Validators.required],
      'shortname': ['', Validators.required],
      'ssn': ['', [Validators.required, Validators.pattern(this.ssnPattern)]],
      'gender': ['', Validators.required],
      'countryOfResidence': ['Please select...', [Validators.required, ValidateDropDownDefault]],
      'passport': ['', [Validators.required, Validators.pattern(this.passportPattern)]],
      'countryOfIssuance': ['Please select...', [Validators.required, ValidateDropDownDefault]],
      'issuanceDate' : ['', Validators.pattern(this.dateFormat)],
      'expirationDate' : ['', Validators.pattern(this.dateFormat)],
      'noOfDependents' : ['', [Validators.required, Validators.pattern(this.noOfDependentsPattern)]],
      'maritalStatus' : ['Please select...', [Validators.required, ValidateDropDownDefault]]
    });
  }

  ngOnInit() {
  }
  
  createUserRecord(data) {
    
	 //  this.isValidFormSubmitted = false;
	 //  if(this.userForm.invalid){
		// return;	
	 //  } 	
	   //this.isValidFormSubmitted = true;	
	   console.log('Is userform valid: ' + this.userForm.valid);
	   console.log(data);
	   this.user = data;
	   
	   this.service.createUser(this.user);	 
	   //this.reset();
	}
  
  resetForm(){
    // Resets to blank object
    this.userForm.reset(
      { 
        prefix: 'Please select...', 
        countryOfResidence: 'Please select...', 
        countryOfIssuance: 'Please select...', 
        maritalStatus: 'Please select...' 
      }
    );
  }

}

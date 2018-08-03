import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidateDropDownDefault } from '../validators/dropdown.default.validator';
import { TrusteeService  } from '../trustee.service';
import { Trustee } from '../trustee.model';

@Component({
  selector: 'app-create-trustee',
  templateUrl: './create-trustee.component.html',
  styleUrls: ['./create-trustee.component.css']
})
export class CreateTrusteeComponent implements OnInit {
  trusteeForm: FormGroup;
  ssnPattern: string = '^[0-9]{9}$';
  passportPattern: string = '^[a-zA-Z]{1}[0-9]{7}$';
  noOfDependentsPattern: string = '^[0-9]+$';
  dateFormat: string = '^[0-9]{2}-[0-9]{2}-[0-9]{4}$';
  trustee: Trustee;

  constructor(fb: FormBuilder, private service: TrusteeService, private router: Router) {
    this.trusteeForm = fb.group({
      'id': [''],
      'prefix': ['Please select...', [Validators.required, ValidateDropDownDefault]],
      'firstName': ['', Validators.required],
      'middleName': [''],
      'lastName': ['', Validators.required],
      'shortName': ['', Validators.required],
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
  
  createTrustee(data: Trustee) {	
	   console.log('Is trusteeform valid: ' + this.trusteeForm.valid);
	   console.log('create: ' + data);
	   this.trusteeForm.setValue(data);
	   this.trustee = data;
	   
     this.service.createTrustee(this.trustee)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(['/dashboard', {created : true}]);
      }, (error) => {
        console.log('Error occurred while creating a new record: ' + error);
      });
      
	}
  
  resetForm(){
    // Resets to blank object
    this.trusteeForm.reset(
      { 
        prefix: 'Please select...', 
        countryOfResidence: 'Please select...', 
        countryOfIssuance: 'Please select...', 
        maritalStatus: 'Please select...' 
      }
    );
  }

}

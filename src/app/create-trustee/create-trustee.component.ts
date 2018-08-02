import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ValidateDropDownDefault } from '../validators/dropdown.default.validator';
import { TrusteeService  } from '../trustee.service';

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
  trustee: any;

  constructor(fb: FormBuilder, private service: TrusteeService) {
    this.trusteeForm = fb.group({
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
  
  createTrustee(data) {	
	   console.log('Is trusteeform valid: ' + this.trusteeForm.valid);
	   console.log(data);
	   this.trustee = data;
	   
     this.service.createTrustee(this.trustee)
      .subscribe((response) => console.log(response));	 
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { TrusteeService } from '../trustee.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { Trustee } from '../trustee.model';
import { ValidateDropDownDefault } from '../validators/dropdown.default.validator';

@Component({
  selector: 'app-edit-trustee',
  templateUrl: './edit-trustee.component.html',
  styleUrls: ['./edit-trustee.component.css']
})
export class EditTrusteeComponent implements OnInit {

  id: number;
  trustee: Trustee;
  trusteeForm: FormGroup;
  ssnPattern: string = '^[0-9]{9}$';
  passportPattern: string = '^[a-zA-Z]{1}[0-9]{7}$';
  dateFormat: string = '^[0-9]{2}-[0-9]{2}-[0-9]{4}$';
  isUpdated: boolean = false;
  noOfDependentsPattern: string = '^[0-9]+$';

  constructor(private service: TrusteeService, private route: ActivatedRoute, fb: FormBuilder, private router: Router) { 
  
    this.trusteeForm = fb.group({
      'id': [''],
      'prefix': ['', [Validators.required, ValidateDropDownDefault]],
      'firstName': ['', Validators.required],
      'middleName': [''],
      'lastName': ['', Validators.required],
      'shortName': ['', Validators.required],
      'ssn': ['', [Validators.required, Validators.pattern(this.ssnPattern)]],
      'gender': ['', Validators.required],
      'countryOfResidence': ['', [Validators.required, ValidateDropDownDefault]],
      'passport': ['', [Validators.required, Validators.pattern(this.passportPattern)]],
      'countryOfIssuance': ['', [Validators.required, ValidateDropDownDefault]],
      'issuanceDate' : ['', [Validators.required, Validators.pattern(this.dateFormat)]],
      'expirationDate' : ['', [Validators.required, Validators.pattern(this.dateFormat)]],
      'noOfDependents' : ['', [Validators.required, Validators.pattern(this.noOfDependentsPattern)]],
      'maritalStatus' : ['', [Validators.required, ValidateDropDownDefault]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = +params['id'];
      
      this.service.getTrusteeById(this.id)
        .subscribe((data: Trustee) => {
          this.trusteeForm.setValue(data);
          this.trustee = data;
        });
    });
    
     this.route.params.subscribe(params => {
        if (params['updated']) {
          this.isUpdated = params['updated'];
        }
    });
  }
  
  updateTrusteeRecord(data: Trustee) {
    if(this.trusteeForm.valid) {
      if(this.id) {
        this.service.updateTrustee(this.id, data)
          .subscribe((response) => {
            this.router.navigate(['/trustees/'+ this.id + '/edit', {updated : true}]);
          }, (error) => {
            console.log('Error occurred while updating record: ' + error);
          });
      }
    } else {
      console.log('Resolve validation errors to proceed.');
    }
  }
}

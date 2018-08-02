import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { TrusteeService } from '../trustee.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-trustee',
  templateUrl: './edit-trustee.component.html',
  styleUrls: ['./edit-trustee.component.css']
})
export class EditTrusteeComponent implements OnInit {

  id: number;
  trustee: any;
  trusteeForm: FormGroup;
  ssnPattern: string = '^[0-9]{9}$';
  passportPattern: string = '^[a-zA-Z]{1}[0-9]{7}$';
  dateFormat: string = '^[0-9]{2}-[0-9]{2}-[0-9]{4}$';

  constructor(private service: TrusteeService, private route: ActivatedRoute, fb: FormBuilder) { 
  
    this.trusteeForm = fb.group({
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
      'issuanceDate' : ['', Validators.pattern(this.dateFormat)],
      'expirationDate' : ['', Validators.pattern(this.dateFormat)],
      'noOfDependents' : [''],
      'maritalStatus' : ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = +params['id'];
      //console.log('id value passed is: ' + this.id);
      
      this.service.getTrusteeById(this.id)
        .subscribe((data) => {
          this.trustee = data;
        });
    });
  }
  
  updateTrusteeRecord(data) {
    console.log(data);
  }

}

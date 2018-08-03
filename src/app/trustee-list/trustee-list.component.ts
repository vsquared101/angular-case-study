import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { TrusteeService } from '../trustee.service';
import { Trustee } from '../trustee.model';

@Component({
  selector: 'app-trustee-list',
  templateUrl: './trustee-list.component.html',
  styleUrls: ['./trustee-list.component.css']
})
export class TrusteeListComponent implements OnInit {
  trustees: Trustee[];
  isCreated: boolean = false;

  constructor(private service: TrusteeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getTrustees()
      .subscribe((data: Trustee[]) => {
        this.trustees = data;
      });
      
    this.isCreated = false;
    
    this.route.params.subscribe(params => {
        if (params['created']) {
          this.isCreated = params['created'];
        }
    });
  }

  deleteTrustee(id: number) {
    this.service.deleteTrustee(id)
      .subscribe((data) => {
        this.service.getTrustees().
          subscribe((data) => this.trustees = data);
    });
  }
}

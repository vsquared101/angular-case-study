import { Component, OnInit } from '@angular/core';
import { TrusteeService  } from '../trustee.service';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-view-trustee',
  templateUrl: './view-trustee.component.html',
  styleUrls: ['./view-trustee.component.css']
})
export class ViewTrusteeComponent implements OnInit {
  id: number;
  trustee: any;

  constructor(private service: TrusteeService, private route: ActivatedRoute) { }

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

}

import { Component, OnInit } from '@angular/core';
import { TrusteeService } from '../trustee.service';

@Component({
  selector: 'app-trustee-list',
  templateUrl: './trustee-list.component.html',
  styleUrls: ['./trustee-list.component.css']
})
export class TrusteeListComponent implements OnInit {
  trustees: any;

  constructor(private service: TrusteeService) { }

  ngOnInit() {
    this.service.getTrustees()
      .subscribe((data) => {
        this.trustees = data;
      });
  }

  deleteTrustee(id: number) {
    this.service.deleteTrustee(id)
      .subscribe((data) => {
        this.service.getTrustees().subscribe((data) => this.trustees = data);
    });
  }

}

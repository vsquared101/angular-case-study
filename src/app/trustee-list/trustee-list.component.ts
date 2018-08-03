import { Component, OnInit } from '@angular/core';
import { TrusteeService } from '../trustee.service';
import { Trustee } from '../trustee.model';

@Component({
  selector: 'app-trustee-list',
  templateUrl: './trustee-list.component.html',
  styleUrls: ['./trustee-list.component.css']
})
export class TrusteeListComponent implements OnInit {
  trustees: Trustee[];

  constructor(private service: TrusteeService) { }

  ngOnInit() {
    this.service.getTrustees()
      .subscribe((data: Trustee[]) => {
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

import { Component, OnInit } from '@angular/core';
import {FundsAllocService} from '../../services/srv-funds-alloc.service';
import { IAllocation } from 'src/app/interfaces/FundAllocation';

import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css', '../fm.shared.css']
})
export class FundListComponent implements OnInit {

  faList: IAllocation[];
  constructor(private router: Router, private svc: FundsAllocService) { }

  ngOnInit() {
    this.svc.getData('api/funds').subscribe(data => {
         this.faList = data as IAllocation[];
    });
  }

  ViewDetail(symbol: string) {
    const detailsUrl = `/fa/${symbol}`;
    this.router.navigate([detailsUrl]);
  }

  UpdateFA(symbol: string) {
    const detailsUrl = `/updateFA/${symbol}`;
    this.router.navigate([detailsUrl]);
  }

  DeleteFA(symbol: string) {
    // const detailsUrl = `/updateFA/${fundName}`;
    this.svc.delete('api/funds', symbol).subscribe();
  }
}

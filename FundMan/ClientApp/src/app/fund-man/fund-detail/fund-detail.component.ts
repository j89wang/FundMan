import { Component, OnInit } from '@angular/core';
import {FundsAllocService} from '../../services/srv-funds-alloc.service';
import { IAllocation } from 'src/app/interfaces/FundAllocation';

import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-fund-detail',
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent implements OnInit {

  fund: IAllocation;
  fid: string;
  constructor( private route: ActivatedRoute, private srv: FundsAllocService, private _location: Location ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fid = params.get('id');
      this.srv.getData('api/funds/' + this.fid).subscribe(res => {
        this.fund = res as IAllocation;
        this.formatFA(this.fund);
      });
    });
  }

  backClicked() {
    this._location.back();
  }

  private formatFA(fa: IAllocation) {
      fa.cash = ( fa.cash === null ||  fa.cash === undefined ) ? 0 : fa.cash;
      fa.usequity = ( fa.usequity === null ||  fa.usequity === undefined ) ? 0 : fa.usequity;
      fa.nonUsequity = ( fa.nonUsequity === null ||  fa.nonUsequity === undefined ) ? 0 : fa.nonUsequity;
      fa.fixedIncome = ( fa.fixedIncome === null ||  fa.fixedIncome === undefined ) ? 0 : fa.fixedIncome;
      fa.other = ( fa.other === null ||  fa.other === undefined ) ? 0 : fa.other;
  }
}

import { Component, OnInit } from '@angular/core';
import { IValue } from 'src/app/interfaces/FundValue';
import { FundsAllocService } from 'src/app/services/srv-funds-alloc.service';
import { ActiveMenuService } from 'src/app/services/active-menu.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['../fm.shared.css', './value-list.component.css']
})
export class ValueListComponent implements OnInit {
  fvs: IValue[];
  fvsAll: IValue[];
  fv: IValue;
  fName: string;
  menuText = 'FundValue';
  accounts: string[];
  accountSelected: string;
  sum: number;

  public fvForm: FormGroup = new FormGroup({
     valueDetail: new FormControl('')
  });

  constructor(private svc: FundsAllocService, private datePipe: DatePipe, private menuService: ActiveMenuService) { }

  ngOnInit() {
      this.svc.getData('fv/fvalues').subscribe(data => {
          this.fvs = data as IValue[];
          this.fvsAll = this.fvs;
          this.sum = this.fvs.reduce(this.getSum, 0);
          this.accounts = [... new Set(this.fvs.map(d => d.cyberAccountId))];
          this.accounts.splice(0, 0, 'All');
       });
       this.menuService.SetCurMenu('FundValue');
  }


  public filterFV(vl) {
    // console.log(fv);
    if ( vl && vl !== 'All') {
        this.fvs = [... new Set(this.fvsAll.filter(d => d.cyberAccountId === vl))];
        this.sum = this.fvs.reduce(this.getSum, 0);
    } else {
      if ( vl && vl === 'All') {
        this.fvs = this.fvsAll;
        this.sum = this.fvs.reduce(this.getSum, 0);
      }
    }
  }
  // public updateFV(fvFormValue) {
  //   console.log(fvFormValue);
  //   // this.executeUpdateFA(faFormValue);
  // }

  public updateFV(vl) {
    // console.log(fv);
    this.executeUpdateFV(vl);
  }

  private executeUpdateFV(fvFormValue) {
    const lfv: IValue = {
      fvID: 0,
      fundName: fvFormValue.valueDetail.fundName,
      value: fvFormValue.valueDetail.value == null ? 0 : Number(fvFormValue.valueDetail.value),
      cyberAccountId: fvFormValue.valueDetail.cyberAccountId === null ? ' ' : fvFormValue.valueDetail.CyberAccountId,
      date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
    };

    const apiUrl = 'fv/postValue';
    this.svc.update(apiUrl, lfv)
    .subscribe(res => {
      // console.log('executeUpdateFV ' + res);
    });
  }

  getSum(total, vl) {
    return total + vl.value;
  }

  private isCurrentMenu(): boolean {
    return this.menuText === this.menuService.GetCurMenu();
  }

  public accountChange(vl) {
    console.log('accountChange ' + vl);
    this.accountSelected = vl;
    this.filterFV(this.accountSelected);
  }

}

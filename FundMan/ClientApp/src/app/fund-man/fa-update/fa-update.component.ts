import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IAllocation } from 'src/app/interfaces/FundAllocation';
import { FundsAllocService } from 'src/app/services/srv-funds-alloc.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-fa-update',
  templateUrl: './fa-update.component.html',
  styleUrls: ['./fa-update.component.css']
})
export class FaUpdateComponent implements OnInit {

  fa: IAllocation;
  fName: string;
  public faForm: FormGroup;

  constructor( private route: ActivatedRoute, private srv: FundsAllocService, private datePipe: DatePipe) { }

  ngOnInit() {
   const dt: Date = new Date();
   this.route.paramMap.subscribe(params => {
      this.fName = params.get('id');
      this.srv.getData('api/funds/' + this.fName).subscribe(res => {
        this.fa = res as IAllocation;
        if ( this.fa != null) {
          this.Refresh(this.fa);
        }
      });
      this.creatForm();
    });
  }

  public Refresh(fa: IAllocation) {
    this.faForm.get('symbol').setValue(fa.symbol);
      this.faForm.get('usequity').setValue(fa.usequity);
    this.faForm.get('nonUsequity').setValue(fa.nonUsequity);
    this.faForm.get('fixedIncome').setValue(fa.fixedIncome);
    this.faForm.get('cash').setValue(fa.cash);
    this.faForm.get('other').setValue(fa.other);
    this.faForm.get('name').setValue(fa.name);
    this.faForm.get('total').setValue(this.totalPercent());
  }

  private creatForm() {
      if ( this.faForm === undefined) {
        this.faForm = new FormGroup({
          symbol: new FormControl(''),
          usequity: new FormControl(''),
          nonUsequity: new FormControl(''),
          fixedIncome: new FormControl(''),
          cash: new FormControl(''),
          other: new FormControl(''),
          name: new FormControl(''),
          total: new FormControl('')
       });
      }
  }

  public updateFA(faFormValue) {
      this.executeUpdateFA(faFormValue);
  }

  private executeUpdateFA(faFormValue) {
      const lfa: IAllocation = {
        symbol: faFormValue.symbol,
        usequity: faFormValue.usequity == null ? 0 : Number(faFormValue.usequity),
        nonUsequity: faFormValue.nonUsequity === null ? 0 : Number(faFormValue.nonUsequity),
        fixedIncome: faFormValue.fixedIncome == null ? 0 : Number(faFormValue.fixedIncome),
        cash: faFormValue.cash == null ? 0 : Number(faFormValue.cash),
        other: faFormValue.other == null ? 0 : Number(faFormValue.other),
        name: faFormValue.name == null ? '' : faFormValue.name,
        dateModified: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
      };

      const apiUrl = 'api/Funds/';
      this.srv.update(apiUrl, lfa)
      .subscribe(res => {
        console.log(res);
      });
  }

  private totalPercent(): Number {
    return this.fa.cash.valueOf() + this.fa.usequity.valueOf() + this.fa.nonUsequity.valueOf() +
           this.fa.fixedIncome.valueOf() + this.fa.other.valueOf();
  }
}

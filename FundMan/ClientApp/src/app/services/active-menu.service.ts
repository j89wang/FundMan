import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveMenuService {
  curMenuItem = 'FundValue';
  constructor() { }

  public GetCurMenu(): string {
      return this.curMenuItem;
  }

  public SetCurMenu(itm) {
    this.curMenuItem = itm;
  }
}

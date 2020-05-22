import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundListComponent } from './fund-list/fund-list.component';
import { FundDetailComponent } from './fund-detail/fund-detail.component';
import { FaUpdateComponent } from './fa-update/fa-update.component';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { ValueListComponent } from './value-list/value-list.component';
import { FvUpdateComponent } from './fv-update/fv-update.component';
import { ValueDetailComponent } from './value-detail/value-detail.component';

import {MaterialModule} from '../../../src/app/material/material.module';
// import { UtilsModule } from '../../app/utils/utils.module';

@NgModule({
  declarations: [FundListComponent, FundDetailComponent, FaUpdateComponent, ValueListComponent, FvUpdateComponent, ValueDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
    // UtilsModule
  ],
  providers:
  []
})
export class FundManModule { }

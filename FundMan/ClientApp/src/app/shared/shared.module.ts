import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessModalComponent } from './Modals/success-modal/success-modal.component';
import { ErrorModalComponent } from './Modals/error-modal/error-modal.component';
import { CanvasjsChartComponent } from './Comm/canvasjs-chart/canvasjs-chart.component';

@NgModule({
  declarations: [SuccessModalComponent, ErrorModalComponent, CanvasjsChartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CanvasjsChartComponent
  ]
})
export class SharedModule { }

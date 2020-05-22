import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { UtilsModule } from '../../app/utils/utils.module';
import { SharedModule } from '../../app/shared/shared.module';
import { PortfolioChartComponent } from './portfolio-chart/portfolio-chart.component';

@NgModule({
  declarations: [PortfolioChartComponent],
  imports: [
    CommonModule,
    // UtilsModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class FundAnalysisModule { }

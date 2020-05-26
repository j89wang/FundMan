import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FundManModule } from './fund-man/fund-man.module';
import { DatePipe } from '@angular/common';
// import { UtilsModule } from '../app/utils/utils.module';
import { SharedModule } from '../app/shared/shared.module';
import { FundAnalysisModule } from '../app/fund-analysis/fund-analysis.module' ;

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FundListComponent } from './fund-man/fund-list/fund-list.component';
import { FundDetailComponent } from './fund-man/fund-detail/fund-detail.component';
import { FaUpdateComponent } from './fund-man/fa-update/fa-update.component';
import { ValueListComponent } from './fund-man/value-list/value-list.component';
import { PortfolioChartComponent } from './fund-analysis/portfolio-chart/portfolio-chart.component';

import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    // ReactiveFormsModule,
    FundManModule,
    // UtilsModule,
    SharedModule,
    FundAnalysisModule,
    RouterModule.forRoot([
      { path: '', component: ValueListComponent, pathMatch: 'full' },
      { path: 'allocation', component: FundListComponent },
      { path: 'fa/:id', component: FundDetailComponent },
      { path: 'updateFA/:id', component: FaUpdateComponent },
      { path: 'analysis', component: PortfolioChartComponent }
    ]),
    BrowserAnimationsModule
  ],
  exports: [
    // CanvasjsChart2Component
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

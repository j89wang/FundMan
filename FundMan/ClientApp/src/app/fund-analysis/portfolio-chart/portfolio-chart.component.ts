import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IChartPoint } from 'src/app/interfaces/IChartPoint';
import { IValue } from 'src/app/interfaces/FundValue';
import { IPoint } from 'src/app/interfaces/IPoint';
import { FundsAllocService } from 'src/app/services/srv-funds-alloc.service';
import { FormGroup, FormControl } from '@angular/forms';
// import { CanvasjsChart2Component } from '../../utils/canvasjs-chart2/canvasjs-chart2.component';
import { CanvasjsChartComponent } from '../../shared/Comm/canvasjs-chart/canvasjs-chart.component';

@Component({
  selector: 'app-portfolio-chart',
  templateUrl: './portfolio-chart.component.html',
  styleUrls: ['./portfolio-chart.component.css', '../../fund-man/fm.shared.css']
})
export class PortfolioChartComponent implements OnInit {
  menuText = 'FundAnalysis';
  fvs: IValue[];
  sum: number;
  dt: IPoint[];
  dtPoints: IChartPoint[] = [];
  // type: string;
  // title: string;
  type: string;
  title: string;

  @ViewChild(CanvasjsChartComponent) chart: CanvasjsChartComponent;
  /// @ViewChild('myChart') myChart: ElementRef<CanvasjsChart2Component>;

  public pcForm: FormGroup = new FormGroup({
    pcChart: new FormControl('')
 });

  constructor(private svc: FundsAllocService) { }

  ngOnInit(): void {
    this.svc.getData('api/fv/PortfolioSummary').subscribe(data => {
      this.dt = data as IPoint[];
      this.sum = this.dt.reduce(this.getSum, 0);
      this.setChartData(this.dt, this.dtPoints);
       // this.accounts = [... new Set(this.fvs.map(d => d.cyberAccountId))];
      // this.accounts.splice(0, 0, 'All');
      this.type = 'column';
      this.title = 'Portfolio Detail Chart';
      if ( this.chart !== undefined ) {
        this.chart.createChart();
      }
      /// this.myChart.nativeElement.createChart();
    });
  }

  onSubmit() {
    console.warn(this.pcForm.value);
  }

  getSum(total, vl) {
    return total + vl.amount;
  }

  setChartData(data: IPoint[], data2: IChartPoint[]) {
    let boilerColor, deltaY, yVal, sLabel, pcnt, v;
    // var dps = chart.options.data[0].dataPoints;
    for (let i = 0; i <  data.length; i++) {
      deltaY = Math.round(2 + Math.random() * (-2 - 2 ));
      yVal = data[i].amount;
      boilerColor = yVal > 200 ? '#FF2500' : yVal >= 170 ? '#FF6000' : yVal < 170 ? '#6B8E23 ' : null;
      v = 100 * yVal / this.sum;
      pcnt = parseFloat(v).toFixed(2) + '%';
      sLabel = data[i].type + '(' + pcnt + ')';
      data2.push({ label: sLabel , y: yVal});
    }
  }
}

import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { IChartPoint } from 'src/app/interfaces/IChartPoint';

import * as CanvasJS from 'canvasjs/dist/canvasjs.min';
// import { ControlValueAccessor, FormGroup, Validator } from '@angular/forms';
import { ControlValueAccessor, FormGroup, FormControl, Validator, Validators, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-canvasjs-chart',
  templateUrl: './canvasjs-chart.component.html',
  styleUrls: ['./canvasjs-chart.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CanvasjsChartComponent),
      multi: true
    }
  ]
})
export class CanvasjsChartComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() points: IChartPoint[];
  @Input() type: string;
  @Input() title: string;

    mPoints: IChartPoint[]  = [];
    mType: string;
    mTitle: string;

    public chartForm: FormGroup = new FormGroup({
      // cContainer: new FormControl(''),
    });

  constructor() { }

  ngOnInit(): void {
    this.mPoints = this.points;
    this.mType = this.type || 'column';
    this.mTitle = this.title || 'CanvasJS Chart';
    this.createChart();
  }

  public onTouched: () => void = () => {};

  createChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: this.mTitle
      },
      data: [{
        type: this.mType,
        dataPoints: this.mPoints,
        click: this.onClick,
      }],
    });
    chart.render();
  }

  onClick(e) {
    alert(  e.dataSeries.type + ', dataPoint { x:' + e.dataPoint.x + ', y: ' + e.dataPoint.y + ' }' );
  }

  writeValue(val: any): void {
    if ( val !== undefined && val.length > 0 ) {
      this.chartForm.setValue(val, { emitEvent: false });
    }}
    // val && this.fvForm.setValue(val, { emitEvent: false });

  registerOnChange(fn: any): void {
    console.log('on change');
    this.chartForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.chartForm.disable() : this.chartForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('ADress validation');
    return this.chartForm.valid ? null : { invalidForm: {valid: false, message: 'Address fields are invalid'}};
  }
}

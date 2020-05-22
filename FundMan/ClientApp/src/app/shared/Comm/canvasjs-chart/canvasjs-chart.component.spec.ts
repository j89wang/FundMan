import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasjsChartComponent } from './canvasjs-chart.component';

describe('CanvasjsChart2Component', () => {
  let component: CanvasjsChartComponent;
  let fixture: ComponentFixture<CanvasjsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasjsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasjsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

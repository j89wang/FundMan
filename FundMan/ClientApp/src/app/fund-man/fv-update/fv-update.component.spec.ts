import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FvUpdateComponent } from './fv-update.component';

describe('FvUpdateComponent', () => {
  let component: FvUpdateComponent;
  let fixture: ComponentFixture<FvUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FvUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FvUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

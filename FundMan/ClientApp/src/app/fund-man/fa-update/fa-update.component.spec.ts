import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaUpdateComponent } from './fa-update.component';

describe('FaUpdateComponent', () => {
  let component: FaUpdateComponent;
  let fixture: ComponentFixture<FaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

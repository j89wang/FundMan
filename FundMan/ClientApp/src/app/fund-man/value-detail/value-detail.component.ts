import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, Validator, Validators, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FundsAllocService } from 'src/app/services/srv-funds-alloc.service';
import { IValue } from 'src/app/interfaces/FundValue';

@Component({
  selector: 'app-value-detail',
  templateUrl: './value-detail.component.html',
  styleUrls: ['./value-detail.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueDetailComponent),
      multi: true
    }
  ]
})
export class ValueDetailComponent implements OnInit, ControlValueAccessor, Validator {

public vForm: FormGroup = new FormGroup({
  fundName: new FormControl(''),
  value: new FormControl(''),
  cyberAccountId: new FormControl(''),
  date: new FormControl('')
});

  @Input() fvId: number;
  @Output() updateEvent: EventEmitter<IValue> = new EventEmitter<IValue>();
  mfv: IValue;

  constructor(private svc: FundsAllocService) { }

  ngOnInit() {
    this.svc.getData('fv/fundValue/' + this.fvId).subscribe(res => {
      this.mfv = res as IValue;
      this.formatFV(this.mfv);
      this.Refresh(this.mfv);
      // this.formatFA(this.fund);
    });
    this.creatForm();
  }

  private creatForm() {
    if ( this.vForm === undefined) {
      this.vForm = new FormGroup({
        fundName: new FormControl('', Validators.required),
        value: new FormControl('', [Validators.required, Validators.min(1)]),
        cyberAccountId: new FormControl('', Validators.required),
        date: new FormControl('')
     });
    }
  }

  private formatFV(fv: IValue) {
    this.mfv.fundName = ( fv.fundName === null ||  fv.fundName === undefined ) ? ' ' : fv.fundName;
    this.mfv.value = ( fv.value === null ||  fv.value === undefined ) ? 0 : fv.value;
    this.mfv.cyberAccountId = ( fv.cyberAccountId === null ||  fv.cyberAccountId === undefined ) ? ' ' : fv.cyberAccountId;
    this.mfv.date = ( fv.date === null ||  fv.date === undefined ) ? ' ' : fv.date.toString();
  }


  public Refresh(fv: IValue) {
    const dt = new Date(fv.date);
    this.vForm.get('fundName').setValue(fv.fundName);
    this.vForm.get('value').setValue(fv.value);
    this.vForm.get('cyberAccountId').setValue(fv.cyberAccountId);
    this.vForm.get('date').setValue(dt.toLocaleDateString());
  }
  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    if ( val !== undefined && val.length > 0 ) {
      this.vForm.setValue(val, { emitEvent: false });
    }}
    // val && this.fvForm.setValue(val, { emitEvent: false });

  registerOnChange(fn: any): void {
    console.log('on change');
    this.vForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.vForm.disable() : this.vForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('ADress validation');
    return this.vForm.valid ? null : { invalidForm: {valid: false, message: 'Address fields are invalid'}};
  }

  updateClicked(obj) {
    // console.log(obj);
    // this.updateEvent.emit(obj);
    this.updateEvent.emit(obj);
  }

  get mvalue() { return this.vForm.get('value'); }

  get mgroup() { return this.vForm.get('cyberAccountId'); }
}

import { Component, OnInit, Input } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css', '../modal-shared.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Input() public modalHeaderText;
  @Input() public modalBodyText;
  @Input() public okButtonText;

  constructor() { }

  ngOnInit() {
  }

}


// material.module.ts

import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ]
})

export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DataFormComponent } from './data-form/data-form.component';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule,MatButtonModule,MatPaginatorModule } from '@angular/material';
@NgModule({
  declarations: [CardComponent, DataFormComponent],
  imports: [
    CommonModule,MatDialogModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatPaginatorModule 
  ],
  exports:[CardComponent,DataFormComponent],
  entryComponents:[DataFormComponent]
})
export class CommomComponentModule { }

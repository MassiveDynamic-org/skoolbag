import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommomComponentModule} from './commom-component/commom-component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatAutocompleteModule,MatProgressSpinnerModule,MatProgressBarModule,MatSnackBarModule} from '@angular/material'

import { StoreModule } from '@ngrx/store'; 
import { SchoolReducer } from './school.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommomComponentModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    StoreModule.forRoot({ schools: SchoolReducer }) 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

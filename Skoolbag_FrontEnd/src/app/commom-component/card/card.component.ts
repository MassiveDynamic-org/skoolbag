import { Component, OnInit, Input,OnChanges, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit,OnChanges {

  @Input () data :any;
  @Output () rowclick: EventEmitter<any> = new EventEmitter();
  
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  schoolData:any = [];
  constructor() { }

  ngOnInit() {
    this.schoolData = this.sliceData(this.data.length);
  //console.log(JSON.stringify(this.school))
  }
  ngOnChanges(){
    this.schoolData = this.sliceData(this.data.length);
  }

  sliceData(length):any{
    let begin = this.pageIndex*this.pageSize 
    let end = begin + this.pageSize;
    this.length = length;
    let slicedData = this.data.slice(begin , end)
    return slicedData;
  }
  onPageEvent(e){
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.schoolData = this.sliceData(e.length);
  }
  onClickRow(index,val,type){
    this.rowclick.emit({index,val,type});
  }
  
}

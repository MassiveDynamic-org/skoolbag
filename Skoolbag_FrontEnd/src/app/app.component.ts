import {
  Component,
  ComponentFactoryResolver, Type,
  ViewChild,
  ViewContainerRef, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { environment } from '../environments/environment';
import { AppHttpService } from "./app-http.Service"
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataFormComponent } from './commom-component/data-form/data-form.component'
import { filter } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import { SchoolModel } from './models/schoolmodel';
import { Observable } from 'rxjs';
import { SchoolAdd, SchoolRemove, SchoolUpdate } from './school.action';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  //@ViewChild('cardcontainer', {read: ViewContainerRef, static: false}) cardcontainer: ViewContainerRef;

  schools: Observable<SchoolModel[]>;
  private isLoading: boolean = false;
  private serachText: string = "";
  private dataFormRef: MatDialogRef<DataFormComponent>;
  private newSchool: any = [];
  getSchoolUrl = (environment.ISDEV_MODE) ? environment.DUMMY_DATA : environment.GET_SCHOOLS;
  postSchoolUrl = environment.POST_SCHOOLS;
  updateSchoolUrl = environment.UPDATE_SCHOOL;
  deleteSchoolUrl = environment.DELETE_SCHOOL
  private SchoolSate: any = [];
  private unFilteredState: any = [];
  private previouseFilter: any = "";
  private filterTxt: any = "";
  private currentIndex: any = null;
  constructor(private snackBar: MatSnackBar, private componentFactoryResolver: ComponentFactoryResolver, private dialog: MatDialog, private cd: ChangeDetectorRef, private httpService: AppHttpService,
    private store: Store<{ schools: SchoolModel[] }>) {
    this.schools = store.pipe(select('schools'));
    this.schools.subscribe(e => {
      this.SchoolSate = [...e];
      this.unFilteredState = [...e];
    })

    console.log('----------schools-----------')
    console.log(this.schools)
    this.loadSchoolData()
  }

  displayMessage(message, action, type) {
    let msgclass = (type == "ERROR") ? "error-txt" : (type == "SUCCESS") ? "success-txt" : "default-txt"
    this.snackBar.open(message, action, {
      duration: 1000, panelClass: msgclass
    });
  }
  AddSchool(schooldata: any) {
    if (schooldata.length) {
      schooldata.forEach(element => {
        this.updateDataStore(element)
      });
    } else {
      this.updateDataStore(schooldata)
    }
  }

  updateDataStore(schooldata) {
    const school = new SchoolModel();
    school.name = schooldata.name;
    school.address = schooldata.address;
    school.count = schooldata.count;
    school._id = schooldata._id;
    this.store.dispatch(new SchoolAdd(school));

  }

  removeSchool(index) {
    this.store.dispatch(new SchoolRemove(index));

  }
  updateSchool(data) {
    this.store.dispatch(new SchoolUpdate(data));
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    //const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.CardComponent);
    //const component = this.cardcontainer.createComponent(componentFactory);    


  }
  loadSchoolData() {
    this.isLoading = true;
    this.httpService.getSchoolData(this.getSchoolUrl).subscribe(result => {
      this.AddSchool(result["data"])
      this.isLoading = false;
    })

  }

  onFilterChange(val) {
    let search = val.toUpperCase();
    this.previouseFilter = (this.previouseFilter.length) ? this.filterTxt : val.toUpperCase();
    this.filterTxt = val.toUpperCase();
    if (this.previouseFilter.length >= this.filterTxt.length) {
      this.SchoolSate = [...this.unFilteredState];
    }
    this.SchoolSate = _.filter(this.SchoolSate, (o) => {
      return ((o.name.toUpperCase().includes(search)) || (o.address.toUpperCase().includes(search)) || (o.count.toString().includes(search)))
    });

  }
  submitSchoolData(data, url, type) {
    if (environment.ISDEV_MODE) {
      this.updateSatet(type, data)
      this.displayMessage("State succesfuly updated", "", "SUCCESS")

    } else {
      this.isLoading = true;
      this.httpService.postSchoolData(url, data).subscribe(response => {
        this.updateSatet(type, response["data"])
        this.displayMessage(response["message"], "", "SUCCESS")
        this.isLoading = false;
      }, err => {
        console.log(err)
        this.displayMessage(err.error.error, "", "ERROR")
        this.isLoading = false;
      });
    }
  }

  updateSatet(type, data) {
    switch (type) {
      case "ADD":
        this.AddSchool(data);
        break;
      case "DELETE":
        this.removeSchool(this.currentIndex);
        break;
      case "UPDATE":
        this.updateSchool({ val: data, index: this.currentIndex })
        break;

    }

  }
  onSchoolAction(frmdata?) {
    if (!!frmdata && frmdata.type == "DELETE") {
      this.currentIndex = frmdata.index;
      this.submitSchoolData({ _id: frmdata.val._id }, this.deleteSchoolUrl, "DELETE");
    } else {
      this.dataFormRef = this.dialog.open(DataFormComponent, {
        hasBackdrop: true,
        data: (!!frmdata && frmdata.val) ? frmdata.val : ''
      });

      this.dataFormRef
        .afterClosed()
        .pipe(filter(data => data))
        .subscribe(data => {
          if (!!frmdata && frmdata.val) {
            this.currentIndex = frmdata.index;
            this.submitSchoolData(data, this.updateSchoolUrl, "UPDATE");
          } else {
            this.submitSchoolData(data, this.postSchoolUrl, "ADD");
          }
        });
    }

  }

  onSelectRow(val) {
    console.log(val);
  }


}

import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  SchoolForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DataFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    console.log(this.data)
    this.SchoolForm = this.formBuilder.group({
      name: [this.data?this.data.name:'',[Validators.required]],
      address:[this.data?this.data.address:'',[Validators.required]],
      count:[this.data?this.data.count:'',[Validators.required,Validators.min(10)]],
      _id:[this.data?this.data._id:null]
    })
  }

  submit(form) {
    
    this.dialogRef.close(form.value);
  }

}

import {Action} from "@ngrx/store"
import { Component, Type } from "@angular/core"
//import { Action } from "rxjs/internal/scheduler/Action"

export enum SchoolActionTypes{
    Add = 'Add',
    Remove = 'Remove',
    Update = 'Update',
}

export class ActionEx implements Action{
    readonly type;
    payload:any;
}

export class SchoolAdd implements ActionEx{
    readonly type = SchoolActionTypes.Add
    constructor(public payload: any){

    }
}
export class SchoolRemove implements ActionEx{
    readonly type = SchoolActionTypes.Remove
    constructor(public payload: any){
        
    }
}
export class SchoolUpdate implements ActionEx{
    readonly type = SchoolActionTypes.Update
    constructor(public payload: any){
        
    }
}


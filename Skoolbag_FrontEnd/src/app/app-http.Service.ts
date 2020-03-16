import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppHttpService {

    constructor(private http: HttpClient) { }
    getSchoolData(url: any) {
        return this.http.get(url);
    }
    postSchoolData(url: any, bodyparam: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };


        return this.http.post(url, bodyparam, httpOptions);
    }
}

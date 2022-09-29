import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Server } from 'http';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) { }

    chart() {
        var reqHeader = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')!)
         });

         return this.http.get<Server[]>(`http://test-demo.aemenersol.com/api/dashboard`, { headers: reqHeader });

    }

}
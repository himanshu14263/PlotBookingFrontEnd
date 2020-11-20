import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Customer from 'src/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class PlotBookingServiceService {

  baseURL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Customer[]> {
    console.log('getPeople ' + this.baseURL + 'student');
    return this.http.get<Customer[]>(this.baseURL + 'student');
  }

  getOwner(plotNumber): Observable<Customer> {
    return this.http.get<Customer>(this.baseURL + 'student/' + plotNumber);
  }

  addPerson(person: Customer): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(person);
    console.log(body);
    return this.http.post(this.baseURL + 'student', body, {headers});
  }
}

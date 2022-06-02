import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from './assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private httpClient: HttpClient) { }
  getAssignments(): Observable<Assignment[]> {
     return this.httpClient.get<Assignment[]>('assets/Assignments.json')
    //return this.httpClient.get<Assignment[]>(this.url + "/allAssignments");
  }
}

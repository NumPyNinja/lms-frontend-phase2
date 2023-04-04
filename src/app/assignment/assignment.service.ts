import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment} from './assignment';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  
  url:environment.url;
  //url: string = '/api';


  constructor(private httpClient: HttpClient) { }
  getAssignments(): Observable<Assignment[]> {
    return this.httpClient.get<Assignment[]>(this.url + "assignments");
  }

  saveAssignment(assigment: Assignment): Observable<Assignment> {
    return this.httpClient.post<Assignment>(this.url + "/assignments", assigment);
  }

  updateAssignment(assigment: Assignment): Observable<Assignment> {
    return this.httpClient.put<Assignment>(this.url + "/assignments/" + assigment.assignmentId, assigment);
  }

  delete(attendance: Assignment) {
    return this.httpClient.delete<string>(this.url + "/assignments/" + attendance.assignmentId);
  }

}

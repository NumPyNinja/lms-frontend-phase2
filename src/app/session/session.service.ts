import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: string = '/api'; //ttps://lms-phase2.herokuapp.com/lms/",
  constructor(private httpClient : HttpClient) { }
  getSessions(): Observable<Session[]> {
    return this.httpClient.get<Session[]>(this.url + "/allClasses"); 
  }
  editSession(session: Session) {
    return this.httpClient.put<Session>(this.url + "/updateClass/" + session.classId, session);
  
  }
  addSession(session: Session) :Observable<Session>{
    return this.httpClient.post<Session>(this.url + "/CreateClassSchedule",session);
  }
  deleteSession(session:Session) {
    return this.httpClient.delete<Session>(this.url + "/deletebyClass/" + session.classId);
  }


  
}

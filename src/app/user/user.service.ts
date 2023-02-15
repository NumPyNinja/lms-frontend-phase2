import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = '/api';//'https://lms-admin-rest-service.herokuapp.com/programs';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    //return this.httpClient.get<any>('assets/Users.json')
    return this.httpClient.get<User[]>(this.url+"/users/roles");
  }

  addUser(userData:FormData){

    return this.httpClient.post<any>(this.url+'/users/roleStatus',userData);
    
  }

  //addProgram(user: User): Observable<User> {
    //user.online = true;
    //return this.httpClient.post<User>(this.url, user);
 // }

  editProgram(user: User) {
   // return this.httpClient.put<User>(this.url + user.userId, user);
  }

  deleteProgram(user: User) {
    //return this.httpClient.delete<User>(this.url + user.userId);
  }
}
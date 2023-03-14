import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRoleMaps } from './user-role-maps';

@Injectable({
  providedIn: 'root'
})
export class UserrolemapService {
  url: string = '/api';//'https://lms-admin-rest-service.herokuapp.com/programs';
  constructor(private httpClient: HttpClient) { }
  getUserRole(): Observable<any> {
    //return this.httpClient.get<any>('assets/Users.json')
    return this.httpClient.get<UserRoleMaps[]>(this.url+"users/roles");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { async, BehaviorSubject, Observable } from 'rxjs';
import { User } from './../user/user';

@Injectable()
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private roleAccess: BehaviorSubject<string> = new BehaviorSubject<string>("");

  user: User[];

  userRoles: string = '';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isRoleAccess() {
    return this.roleAccess.asObservable();
  }

  constructor(
    private router: Router, private httpClient: HttpClient
  ) { }

  login(user: User) {
    this.loggedIn.next(true);
    if (user.userName === 'LMS' && user.password === 'LMS') {
      this.loggedIn.next(true);
      this.getRole();
    }
    else {
      this.router.navigate(['/']);
    }
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getUserRoles(): Observable<User> {
    console.log('In service .. this.getUserRoles')
    return this.httpClient.get<User>('assets/student-userRole.json')
    //return this.httpClient.get<Program[]>(this.url + "/allPrograms"); //https://lms-phase2.herokuapp.com/lms/allPrograms
  }

  async getRole() {
    this.getUserRoles().subscribe(user => {
      user.userRoleMaps.forEach(role => {
        this.userRoles = role.roleId;
      });
      this.roleAccess.next(this.userRoles);
      this.router.navigate(['/']);
    });
  }
}
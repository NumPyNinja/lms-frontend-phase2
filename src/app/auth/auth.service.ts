import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './../user/user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    this.loggedIn.next(true);
    if (user.userName === 'LMS' && user.password === 'LMS' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
    else{
      this.router.navigate(['/']);
    }
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
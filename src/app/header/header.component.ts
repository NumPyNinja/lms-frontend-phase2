import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  @Input() role: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;   
  }

  onLogout() {
    this.authService.logout();
  }

}
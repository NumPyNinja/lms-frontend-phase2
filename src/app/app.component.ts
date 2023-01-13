import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LMS';
  role: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isRoleAccess.subscribe(r => {
      this.role = r;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
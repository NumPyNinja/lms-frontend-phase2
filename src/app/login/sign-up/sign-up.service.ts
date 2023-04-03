import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SignUp } from './sign-up';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  baseUrl = environment.baseUrl;

  //url:string = "api";//'https://lms-admin-rest-service.heroku.com/signup';

  constructor(private httpClient: HttpClient) { }

  addSignupUser(signup : SignUp):Observable<SignUp>{
      
      return this.httpClient.post<SignUp>(this.baseUrl +"/signup",signup);
  }


}

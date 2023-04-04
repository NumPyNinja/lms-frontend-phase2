import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from './class';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  

  //url: string = '/api';

  constructor(private httpClient: HttpClient) { }

  getClassList(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(this.url + "/allClasses");
  }

}

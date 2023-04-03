import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../shared/utility.service';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {

    baseUrl = environment.baseUrl;

  //url: string = '/api'; //https://lms-phase2.herokuapp.com/lms/",

  constructor(private httpClient: HttpClient,
              private utilityService: UtilityService) { }

  getPrograms(): Observable<Program[]> {
    // return this.httpClient.get<Program[]>('assets/Programs.json')
    return this.httpClient.get<Program[]>(this.baseUrl + "/allPrograms"); //https://lms-phase2.herokuapp.com/lms/allPrograms
  }
  addProgram(program: Program): Observable<Program> {
    return this.httpClient.post<Program>(this.baseUrl + "/saveprogram", program)
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.utilityService.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        }));
  }

  editProgram(program: Program) {
    return this.httpClient.put<Program>(this.baseUrl + "/putprogram/" + program.programId, program); ///https://lms-phase2.herokuapp.com/lms/putprogram/1
  }

  deleteProgram(program: Program) {
    return this.httpClient.delete<Program>(this.baseUrl + "/deletebyprogid/" + program.programId);
  }

}




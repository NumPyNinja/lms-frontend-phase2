import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {

  url: string = '/api';

  constructor(private httpClient: HttpClient) { }

  getPrograms(): Observable<Program[]> {
    // return this.httpClient.get<Program[]>('assets/Programs.json')
    return this.httpClient.get<Program[]>(this.url + "/allPrograms");
  }

  addProgram(program: Program): Observable<Program> {
    return this.httpClient.post<Program>(this.url + "/saveprogram", program);
  }

  editProgram(program: Program) {
    return this.httpClient.put<Program>(this.url + "/putprogram/" + program.programId, program);
  }

  deleteProgram(program: Program) {
    return this.httpClient.delete<Program>(this.url + "/deletebyprogid/" + program.programId);
  }

}




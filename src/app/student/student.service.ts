import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadedAssignment } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url: string = '/api';

  constructor(private httpClient: HttpClient) { }
  
  uploadAssignments(uploadedAssignment: UploadedAssignment) {
    return this.httpClient.post('', uploadedAssignment);
  }
}

import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Class } from 'src/app/class/class';
import { ClassService } from 'src/app/class/class.service';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Attendance } from '../attendance';
import { AttendanceService } from '../attendance.service';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  selectedCountries: any[];
  attendances: Attendance[];
  countries: Attendance[];
  attendanceSize: number;
  selectedAttendances: Attendance[];
  visibility: boolean = false;
  attendance: Attendance;
  attendanceDialogue: boolean;
  selectedAttendance: Attendance[];
  submitted: boolean;
  programList: Program[];
  selectedProgram: string;
  classList: Class[];
  selectedClasses: Class[];
  selectedStudents: User[];
  selectedDate: Date;
  users: User[];

  constructor(
    private attendanceService: AttendanceService,
    private messageService: MessageService,
    private programService: ProgramService,
    private confirmationService: ConfirmationService,
    private classService: ClassService,
    private userService: UserService) {
    this.programService.getPrograms().subscribe(list => {
      this.programList = list;
    })
  }

  ngOnInit(): void {
    this.getAttendanceList();

  }

  private getAttendanceList() {
    this.visibility = true;
    this.attendanceService.getAttendanceList().subscribe((res) => {
      this.attendances = res;
      console.log('Backend data' + res)
      this.attendanceSize = this.getMaxAttendanceId(0);
      this.visibility = false;
    });
  }

  private getMaxAttendanceId(max: number) {
    this.attendances.forEach((character) => {
      const tempAttendanceId = Number(character.attId);

      if (tempAttendanceId > max) {
        max = tempAttendanceId;
      }
    });
    return max;
  }


  //add a new attendance 
  async openNew() {
    this.attendance = {};
    this.submitted = false;
    this.attendanceDialogue = true;
    await this.classService.getClassList().subscribe(res => {
      this.classList = res;
    })
    await this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    })

  }

  hideDialog() {
    this.attendanceDialogue = false;
    this.submitted = false;
  }

  //save an attendance 
  saveAttendance() {

    this.submitted = true;
    if (this.attendance.attId) {
      const attId = this.attendance.attId.trim();
      this.attendances[this.findIndexById(attId)] = this.attendance;

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Attendance Updated',
        life: 3000,
      });

      this.attendanceService.getAttendanceList().subscribe((res) => {
        console.log('a attendance is save')
      });

    } else {
      let newAttendanceCount: number = 1;
      this.selectedClasses.forEach((selectedClass) => {
        this.selectedStudents.forEach((selectedStudent) => {
          let attendance: Attendance = {};
          attendance.csId = selectedClass.csId.toString();
          attendance.studentId = selectedStudent.userId;
          attendance.attendance = 'Present';
          this.attendanceService.addAttendance(attendance).subscribe((res) => {
            newAttendanceCount = newAttendanceCount + 1;
          }, err => {
            this.messageService.add({
              severity: 'failure',
              summary: 'Failed',
              detail: 'Attendance creation failed',
              life: 3000,
            });
          });
        });
      })
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: newAttendanceCount + ' new attendances created',
        life: 3000,
      });
      this.getAttendanceList();
    }
    this.attendanceDialogue = false;
  }

  deleteAttendance(attendance: Attendance) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + attendance.attId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendances = this.attendances.filter((val) => val.attId !== attendance.attId);

        this.attendanceService.delete(attendance).subscribe(response => {
          
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Attendance delete',
          life: 3000,
        });
      },
    });
  }

  editAttendance(attendance: Attendance) {
    this.attendance = { ...this.attendance };
    this.attendanceDialogue = true;
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.attendances.length; i++) {
      if (this.attendance[i].attendanceId === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}

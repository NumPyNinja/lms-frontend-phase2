import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Class } from 'src/app/class/class';
import { ClassService } from 'src/app/class/class.service';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
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
  selectedClass: string[];


  constructor(
    private attendanceService: AttendanceService,
    //private attendanceService: AttendanceService,
    private messageService: MessageService,
    private programService: ProgramService,
    private confirmationService: ConfirmationService,
    private classService: ClassService) {

    // this.attendanceService.getProgramUserDetails().subscribe(res => {
    //   console.log(res);
    // })

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
     console.log('kjhkhjkhjkhkjhk'+res)
      this.classList = res;

    })
  }

  //save an assigment
  saveAttendance() {

    this.submitted = true;
    if (this.attendance.attId.trim()) {
      if (this.attendance.attId) {
        this.attendances[this.findIndexById(this.attendance.attId)] = this.attendance;

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Attendance Updated',
          life: 3000,
        });

        ;
      } else {
        this.attendanceSize = this.attendanceSize + 1;
        // this.attendance.attendanceId = this.attendanceSize; //TODO need to be checked
        this.attendances.push(this.attendance);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Attendance Created',
          life: 3000,
        });

      }
      this.attendances = [...this.attendances];
      this.attendanceDialogue = false;
      this.attendance = {};

    }

  }

  deleteAttendance(attendance: Attendance) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + attendance.attId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendances = this.attendances.filter((val) => val.attId !== attendance.attId);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Attendance Deleted',
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

  onChange(event: any) {
    console.log('Test' + event);
    this.users = [];
    // this.attendanceService.getProgramUserDetails().subscribe(res => {
    //   res.forEach(item => {
    //     if (item.programId == event.value.programId) {
    //       this.users = item.users;
    //     }
    //   })
    // })
  }
  users: any;
}

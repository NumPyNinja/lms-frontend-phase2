import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Assignment, AssignmentSelect } from '../assignment';
import { AssignmentService } from '../assignment.service';
import { Message } from 'primeng/api'
import { ProgramService } from 'src/app/program/program.service';
import { Program } from 'src/app/program/program';
import { BatchService } from 'src/app/batch/batch.service';
import { Batch } from 'src/app/batch/batch';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  assignments: Assignment[];
  assignmentSize: number;
  selectedAssignments: Assignment[];
  visibility: boolean = false;
  assignment: Assignment;
  assigmentDialogue: boolean;
  selectedAssigment: Assignment[];
  submitted: boolean;
  assignmentSelectList: AssignmentSelect[] = [];
  selectedUploadAssignment: AssignmentSelect;
  inputFilePath: string = "";
  userId: string = "";
  subscription: Subscription;
  message1: Message[] = [];
  programList: Program[];
  batchList: Batch[];
  selectedBatch: Batch;


  constructor(
    private assignmentService: AssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private programService: ProgramService,
    private batchService: BatchService,
    private authService: AuthService) {
    {
      this.programService.getPrograms().subscribe(list => {
        this.programList = list;
      })
    }
    {
      this.batchService.getBatchList().subscribe(list => {
        this.batchList = list;
      })
    }

  }

  ngOnInit(): void {
    this.getAssignmentList();
    this.subscription = this.authService.loggedInUserId.subscribe((res) => {
      this.userId = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getMaxAssignmentId(max: number) {
    this.assignments.forEach((character) => {
      let assignmentSelectOption: AssignmentSelect = {};
      assignmentSelectOption.assignmentName = character.assignmentName;
      assignmentSelectOption.assignmentId = character.assignmentId;
      this.assignmentSelectList.push(assignmentSelectOption);
      const tempAssignmentId = Number(character.assignmentId);

      if (tempAssignmentId > max) {
        max = tempAssignmentId;
      }
    });
    return max;
  }
  private getAssignmentList() {
    this.visibility = true;
    this.assignmentService.getAssignments().subscribe((res) => {
      this.assignments = res;
      this.assignmentSize = this.getMaxAssignmentId(0);
      this.visibility = false;
    });
  }

  //add a new assignment 
  openNew() {
    this.assignment = {};
    this.submitted = false;
    this.assigmentDialogue = true;
    this.selectedBatch = undefined;
  }

  //save an assigment
  saveAssignment() {
    this.submitted = true;
    if (this.assignment.assignmentName.trim()) {
      if (this.assignment.assignmentId) {
        this.assignmentService.updateAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: ' Assignment Updated',
            life: 3000,
          });
        });
      } else {
        this.assignmentSize = this.assignmentSize + 1;
        this.assignment.createdBy = this.userId;
        if (this.selectedBatch) {
          this.assignment.batchId = this.selectedBatch.batchId;
        }
        this.assignmentService.saveAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Assignment created',
            life: 2000,
          });
        });
      }
      this.assignments = [...this.assignments];
      this.assigmentDialogue = false;
      this.assignment = {};
    }
  }
  hideDialog() {
    this.assigmentDialogue = false;
    this.submitted = false;
    this.selectedBatch = undefined;
  }

  deleteAssigment(assigment: Assignment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + assigment.assignmentName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assignments = this.assignments.filter((val) => val.assignmentId !== assigment.assignmentId);
        this.assignmentService.delete(assigment).subscribe(response => {
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Assignment Deleted',
          life: 2000,
        });
      },
    });
  }

  editAssignment(assigment: Assignment) {
    this.assignment = { ...assigment };
    this.assignment.dueDate = new Date(this.assignment.dueDate);
    this.assigmentDialogue = true;
    this.batchList.forEach(item => {
      if (item.batchId === this.assignment.batchId) {
        this.selectedBatch = item;
      }
    });
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.assignments.length; i++) {
      if (this.assignments[i].assignmentId === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
 

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Assignment } from '../assignment';
import { AssignmentService } from '../assignment.service';

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

  constructor(
    private assignmentService: AssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAssignmentList();
  }

  private getMaxAssignmentId(max: number) {
    this.assignments.forEach((character) => {
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
  }

  //save an assigment
  saveAssignment() {

    this.submitted = true;
    if (this.assignment.assignmentName.trim()) {
      if (this.assignment.assignmentBatchId) {
        this.assignments[this.findIndexById(this.assignment.assignmentId)] = this.assignment;

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Assignment Updated',
          life: 3000,
        });

        ;
      } else {
        this.assignmentSize = this.assignmentSize + 1;
        this.assignment.assignmentBatchId = this.assignmentSize;
        this.assignments.push(this.assignment);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Assignment Created',
          life: 3000,
        });

      }
      this.assignments = [...this.assignments];
      this.assigmentDialogue = false;
      this.assignment = {};

    }

  }

  deleteAssigment(assigment: Assignment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + assigment.assignmentName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assignments = this.assignments.filter((val) => val.assignmentId !== assigment.assignmentId);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Assgigment Deleted',
          life: 3000,
        });
      },
    });
  }

  editAssignment(assigment: Assignment) {
    this.assignment = { ...assigment };
    this.assigmentDialogue = true;
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


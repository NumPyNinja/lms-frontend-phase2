import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Session } from '../session';
import { SessionService } from '../session.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 250px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],

})
export class SessionComponent implements OnInit {
  sessionDialogue:boolean;
  sessionList:Session[];
  session: Session;
  selectedSessions:Session[];
  submitted:boolean;
  sessionSize:number;
visibility: boolean =false;
batchId :number;



  constructor(private sessionService: SessionService, private messageService:MessageService,
    private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.getSessionList();
    
  }
  
  openNew() {
    this.session={};
      this.submitted=false;
      this.sessionDialogue=true;
  
    }
    saveAssignment() {

      this.submitted = true;
      if (this.session.classTopic.trim()) {
        if (this.session.classId) {
          this.sessionList[this.findIndexById(this.session.classId)] = this.session;
  
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Class Updated',
            life: 3000,
          });
  
          ;
        } else {
          this.sessionSize = this.sessionSize + 1;
          this.session.classId = this.sessionSize;
          this.sessionList.push(this.session);
  
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Class Created',
            life: 3000,
          });
  
        }
        this.sessionList = [...this.sessionList];
        this.sessionDialogue = false;
        this.session = {};
  
      }
  
    }
    findIndexById(id: string) :number{
    let index =-1;
    if(this.sessionList!==undefined)
    for(let i =0;i<this.sessionList.length;i++){
      if(this.sessionList[i].classId==id){
        index=i;
        break;
      }
    }
    return index;
  }
    private getSessionList() {
      this.visibility=true;
      this.sessionService.getSessions().subscribe((res)=>{
        res=this.upperCaseProgramStatus(res);
        this.sessionList=res;
        this.sessionSize=this.getMaxClassId(0);
        this.visibility=false;
      })
    }
    editSession(session: Session) {
      this.session.classId =session.batchId;
      this.session = { ...session};
      this.sessionDialogue = true;
    }
  
  
  getMaxClassId(arg0: number): number {
    throw new Error('Method not implemented.');
  }
  upperCaseProgramStatus(arr) {
    arr.forEach(element => {
    const status = element.sessionStatus.charAt(0).toUpperCase() +
     element.sessionStatus.substring(1).toLowerCase();
    element.sessionStatus = status;})
    return arr;


  }
  deleteSession(session: Session) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + session.classTopic + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sessionList= this.sessionList.filter((val) => val.classId !== session.classId);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Class Deleted',
          life: 3000,
        });
      },
    });
  }


}

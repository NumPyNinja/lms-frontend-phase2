import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import{User}from '../user';
import { UserService } from '../user.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  user:User;
  visibility: boolean = false;
  userSize: number;
  selectedUsers: User[];
  submitted: boolean;
  userDialogue : boolean = false;
  viewUserDialogue:boolean=false;
  //to save user profile picture
  imageFile : any = File;
  resumeFile : any = File;


  role = new FormControl();
  
  userRole:string[]=['Admin','Staff','Student'];
  visaTypes: string[] = ['Not-Specified', 'NA', 'GC-EAD', 'H4-EAD', 'H4', 'H1B', 
  'Canada-EAD', 'Indian-Citizen', 'US-Citizen', 'Canada-Citizen'];

  constructor(private userService: UserService,private fb: FormBuilder,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
 
  ngOnInit(): void { 
    this.getUserList();
  }
  private selectRow(checkValue: any) {
  // console.log(checkValue);
  }
  private getUserList() {
    this.visibility = true;
    this.userService.getUsers().subscribe((res)=> {
      this.users=res.userDetails;
      this.visibility = false;
    });
    
  }
  viewUser(user: User) {
    this.user = { ...user };
    this.viewUserDialogue = true;
  }
  hideDialog() {
    this.userDialogue = false;
    this.viewUserDialogue=false;
   this.submitted=false;
  }

  openAssign(){

  }
  
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialogue = true;
  }

  userForm = this.fb.group({
    userId:[],
    userFirstName: [null, Validators.required],
    userMiddleName: [null, Validators.required],
    userLastName: [null, Validators.required],
    emailAddress: [null, Validators.required],
    userPhoneNumber: [null, Validators.required],
    userLinkedinUrl: [null, Validators.required],
    program: [null, Validators.required],
    userEduUg: [null, Validators.required],
    userEduPg: [null, Validators.required],
    userTimeZone:[null, Validators.required],
  //  skill: [null, Validators.required],
  //  prevExp: [null, Validators.required],
    experience: [null, Validators.required],
    usercomments: [null, Validators.required],
    fileType: [null, Validators.required],
    location:[],
    userRole: [null, Validators.required],
  //  batch: [null, Validators.required],
    visaStatus: [null, Validators.required],
    userName: [null, Validators.required],
    password: [null, Validators.required],
  //  address: [null, Validators.required],
   // city: [null, Validators.required],
    //state: [null, Validators.required],
    //postalCode: [null, Validators.compose([
   //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
   // ],
   // shippig: ['free', Validators.required]

  });

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];


  onSubmit1(): void {
    console.log('this.userForm' + this.userForm);
    this.userForm.value;

    this.users.push(this.userForm.value);
    alert('Thanks!');
  }

  editProgram(user: User) {

    console.log('Tesggggggg')
    this.userForm.setValue(user);
    this.userDialogue = true;
   
  }

 
  onSubmit() {
    this.submitted = true;

    if (this.userForm.value) {
      if (this.userForm.value.userId) {

        this.users[this.findIndexById(this.userForm.value.userId)] = this.userForm.value.userId;
      //  this.users[this.findIndexById(this.userForm.u)]
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Successful',
        //   detail: 'Program Updated',
        //   life: 3000,
        // });

        // this.programService.editProgram(this.program).subscribe((res) => {
        //   console.log('a program is updated')
        // });
      } else {
       console.log('hjgjhgjhg');
        this.userSize = this.userSize + 1;
        this.user.userId = this.userSize.toString();
        //this.users.push(this.userForm.value);

        // this.programService.addProgram(this.program).subscribe((res) => {
        // });


        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Successful',
        //   detail: 'Program Created',
        //   life: 3000,
        // });
      }
        const userData = new FormData();
        
        userData.append("userInfo", JSON.stringify(this.userForm.value));
        userData.append("imageFile", this.imageFile);
        userData.append("resume",this.resumeFile);
        
        this.userService.addUser(userData).subscribe({
          next:(res) => {
            //alert("Patient added Successfully!");
            this.userForm.reset();
            //this.userDialogue.close("Patient's details saved.");
            alert("User added successfully");
          },
         error:() =>
          {
          
            alert("Error adding user details.");
          }
        })

      //}

      this.users = [...this.users];
      this.userDialogue = false;
      this.user= {};

      
    }
  }
  deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected Users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));
            this.selectedUsers = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
        }
    });
}
  deleteUser(user: User) {
    this.confirmationService.confirm({
        
       // message: 'Are you sure you want to delete ' + user.userFirstName? + " " + user.userMiddleName+ " " + user.lastName +'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.userId !== user.userId);
            //this.user = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        }
    });
}

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  saveImage(event:any){
   
    const imageFile =event.target.files[0];
        console.log(imageFile);
        this.imageFile = imageFile;

  }

  saveFile(event:any){
   
    const file =event.target.files[0];
        console.log(file);
        this.resumeFile = file;

  }

}
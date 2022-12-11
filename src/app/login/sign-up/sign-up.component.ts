
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SignUp } from './sign-up';
import { SignUpService } from './sign-up.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userDialogue: boolean;
  signUpList: SignUp[];
  signUp: SignUp;
  visibility: boolean = false;
  signUpSize: number;
  submitted: boolean;
  //hideDialogue:boolean=false;
  signUpDialogue: boolean = false;
  viewsignUpDialogue: boolean = false;


  role = new FormControl();

  userRole: string[] = ['Admin', 'Staff', 'Student'];


  constructor(private signupService: SignUpService, private fb: FormBuilder, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    // : void {
    //   this.getUserList();
    // }
    // private selectRow(checkValue: any) {
    //   // console.log(checkValue);
    // }
    // private getUserList() {
    //   this.visibility = true;
    //   this.userService.getUsers().subscribe((res) => {
    //     this.users = res.userDetails;
    //     this.visibility = false;
    //   });

  }
  viewSignUp(signUp: SignUp) {
    this.signUp = { ...signUp };
    this.viewsignUpDialogue = true;
  }
  hideDialogue() {
    this.signUpDialogue = false;
    this.viewsignUpDialogue = false;
    this.submitted = false;
  }
  openNew() {
    this.signUp = {};
    this.submitted = false;
    this.userDialogue = true;
  }

  signUpForm = this.fb.group({
    user_id: [],
    firstName: [null, Validators.required],
    middleName: [null, Validators.required],
    lastName: [null, Validators.required],
    emailAddress: [null, Validators.required],
    phoneNumber: [null, Validators.required],

    location: [],
    signUpRole: [null, Validators.required],
    userName: [null, Validators.required],
    password: [null, Validators.required],
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],



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
    console.log('this.userForm' + this.signUpForm);
    this.signUpForm.value;

    // this.signUp (this.signUpForm.value);
    alert('Thanks!');
  }






  onSubmit() {
    this.submitted = true;


    if (this.signUpForm.value) {
      if (this.signUpForm.value.user_id) {

        // this.users[this.findIndexById(this.userForm.value.user_id)] = this.userForm.value.user_id;
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
        // } else {
        //   console.log('hjgjhgjhg');
        //   this.userSize = this.userSize + 1;
        //   this.user.user_id = this.userSize.toString();
        //   this.users.push(this.userForm.value);

        // this.programService.addProgram(this.program).subscribe((res) => {
        // });


        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Successful',
        //   detail: 'Program Created',
        //   life: 3000,
        // });

        // }

        //     this.users = [...this.users];
        //     this.userDialogue = false;
        //     this.user = {};
        //   }
        // }

      }
    }
  }

}
import { Component, OnInit } from '@angular/core';

import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  [x: string]: any;
  hide = true;
  textInput = 'Link has sent on your registered email !!!';
  firstFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {

    this.firstFormGroup = this.fb.group({

      email: ['', [Validators.required, Validators.email]]
    })

  }
  getEmailErrorMessage() {
    return this.email.hasError('required') ? '' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  onClick() {

    this.displayValue = this.textInput;
  }
  get email() { return this.firstFormGroup.get('email'); }


}
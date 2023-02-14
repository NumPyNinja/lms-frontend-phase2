import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword : FormGroup;
  formErrors = {
    'password': '',
    'rePassword': '',
    'passwordGroup': '',
  };
  validationMessages = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be greater than or equal to 8 characters.',
      'pattern' : 'Password must contain : 1 capital letter, 1 number & 1 special character.'
    },
    'rePassword': {
      'required': 'Password is required.'
    },
    'passwordGroup':{
      'mismatchPassword' : 'Both Passwords do not match.'
    },
  };
  hasError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required,Validators.minLength(8), Validators.pattern("(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{2,}")]],
        rePassword: ['', Validators.required],
      }, { validator: matchPassword }),
    });

    this.resetPassword.valueChanges.subscribe((data) => {
      this.logValidationErrors();
    });
  }

  logValidationErrors(group: FormGroup = this.resetPassword): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.hasError = true
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onSubmit() {
    // resetting the value of hasErrror to false
    this.hasError = false;
    this.logValidationErrors();
    if(!this.hasError){
      // write code for submit here
      console.log(this.resetPassword.value.passwordGroup);
    }
  }
}

function matchPassword(group: AbstractControl): { [key: string]: any } | null {
  const passwordControl = group.get('password');
  const rePasswordControl = group.get('rePassword');

  if (passwordControl.value === rePasswordControl.value || rePasswordControl.pristine) {
    return null;
  } else {
    return { 'mismatchPassword': true };
  }
}

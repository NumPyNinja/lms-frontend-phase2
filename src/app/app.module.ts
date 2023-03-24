import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ProgramComponent } from './program/program/program.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BatchComponent } from './batch/batch/batch.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user/user/user.component';
import { AssignmentComponent } from './assignment/assignment/assignment.component';
import { AttendanceComponent } from './attendance/attendance/attendance.component';

import {ListboxModule} from 'primeng/listbox';
import { SignupComponent } from './login/sign-up/sign-up/sign-up.component';
import { ClassComponent } from './class/class/class.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './login/forgot-password/verification-code/verification-code.component';
import { DropdownModule } from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import { SessionComponent } from './session/session/session.component';

import { ResetPasswordComponent } from './login/forgot-password/reset-password/reset-password.component';

import { StudentComponent } from './student/student.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ProgramComponent,
    BatchComponent,
    UserComponent,
    AssignmentComponent,
    AttendanceComponent,
    SignupComponent,
    ClassComponent,
    ForgotPasswordComponent,
    VerificationCodeComponent,
    ResetPasswordComponent,
    SessionComponent,
    StudentComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ListboxModule,
    DropdownModule,
    MessagesModule
    
  ],
  providers: [AuthService, AuthGuard, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

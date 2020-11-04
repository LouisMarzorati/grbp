import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { AccountComponent } from './account/account.component';
import { EmailLoginComponent } from './email-login/email-login.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [GoogleSigninDirective, LoginPageComponent, EmailLoginComponent, AccountComponent, LoginDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [GoogleSigninDirective, LoginPageComponent, EmailLoginComponent],
  entryComponents: [LoginDialogComponent]

})
export class UserModule { }

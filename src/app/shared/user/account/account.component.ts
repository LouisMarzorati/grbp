import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: firebase.default.User;
  edit = false;
  hasDisplayNameSet: boolean;
  displayNameForm: FormGroup;
  constructor(private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.displayNameForm = this.fb.group({
      displayName: ['', Validators.required]
    });
    this.authService.userData.subscribe((u) => {
      this.user = u;
      this.hasDisplayNameSet = !!u.displayName && u.displayName.length > 0;
      if (this.hasDisplayNameSet) {
        this.displayNameForm.get('displayName').setValue(u.displayName);
      }
    })
  }

  update(): void {
    this.authService
    .updateDisplayName(this.displayNameForm.get('displayName').value)
    .then((result) => {
      if (result) {
        this.displayNameForm.get('displayName').setValue(this.user.displayName);
        this.edit = false;
      }
    })
  }

}

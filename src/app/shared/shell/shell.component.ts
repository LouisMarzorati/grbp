import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../user/login-dialog/login-dialog.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

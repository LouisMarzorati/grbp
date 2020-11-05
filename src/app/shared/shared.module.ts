import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AudioDirective } from './directives/audio.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ShellComponent } from './shell/shell.component';


const components = [
  ShellComponent,
  AudioDirective,
  DateAgoPipe
]
const modules = [
  CommonModule,
  RouterModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  LayoutModule,
  MatCardModule,
  MatSnackBarModule,
  ReactiveFormsModule
]

const providers = [
  MatDialogConfig
]

@NgModule({
  declarations: [...components ],
  imports: [...modules],
  exports: [
    ...components,
    ...modules
  ],
  providers: [...providers]
})
export class SharedModule { }

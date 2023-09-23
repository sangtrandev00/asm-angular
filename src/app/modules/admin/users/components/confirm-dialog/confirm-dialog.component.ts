import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/User';
import { UsersApiActions } from '../../store/users.actions';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private store: Store
  ) {}

  deleteUser() {
    console.log('id: ', this.dialogRef);

    // this.store.dispatch(UsersApiActions.deleteUser({ id: userId }));

    // console.log('user Id: ', this.data);

    const userId = this.data._id as string;

    console.log('user Id: ', userId);

    this.store.dispatch(UsersApiActions.deleteUser({ id: userId }));
  }
}

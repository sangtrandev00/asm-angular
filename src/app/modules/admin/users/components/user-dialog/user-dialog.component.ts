import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersApiActions } from '../../store/users.actions';
import { IUser } from 'src/app/models/User';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class UserDialogComponent {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private store: Store
  ) {}

  userForm = new FormGroup({
    name: new FormControl(this.data.name),
    avatar: new FormControl(this.data.avatar),
    phone: new FormControl(this.data.phone),
    email: new FormControl(this.data.email),
    address: new FormControl(this.data.address),
    payment: new FormControl(this.data.payment),
    role: new FormControl(this.data.role),
    password: new FormControl(''),
    // _id: new FormControl(this.data._id),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('save submitted!', this.userForm.value);

    console.log(this.data);

    // Async dispatch here ???
    const formData: Omit<IUser, '_id'> = {
      name: this.userForm.value.name as string,
      avatar: this.userForm.value.avatar as string,
      email: this.userForm.value.email as string,
      phone: this.userForm.value.phone as string,
      address: this.userForm.value.address as string,
      payment: this.userForm.value.payment as string,
      role: this.userForm.value.role as string,
      password: this.userForm.value.password as string,
      providerId: 'local',
    };

    if (this.data._id) {
      this.store.dispatch(
        UsersApiActions.updateUser({
          id: this.data._id,
          user: formData,
        })
      );
    } else {
      this.store.dispatch(UsersApiActions.addUser({ user: formData }));
    }

    // Sử lý những Effect call API như vậy thì làm như thế nào ?
  }
}

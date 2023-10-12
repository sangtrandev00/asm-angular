import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../store/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent {
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      this.store.dispatch(
        AuthApiActions.register({
          signupData: this.registerForm.value,
        })
      );
    } else {
      this.toastr.error('Please check your input');
    }
  }

  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }
}

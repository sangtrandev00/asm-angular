import { Input, Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../store/auth.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {
  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    console.log('this.loginForm: ', this.loginForm.value);

    if (this.loginForm.valid) {
      // this.submitEM.emit(this.loginForm.value);

      this.store.dispatch(
        AuthApiActions.login({ loginData: this.loginForm.value })
      );
    } else {
      this.toastr.error('Email or password is wrong! Please try it again!');
    }
  }
  // @Input() error: string | null;

  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }

  @Output() submitEM = new EventEmitter();
}

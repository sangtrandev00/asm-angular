import { Input, Component, EventEmitter, Output } from '@angular/core';
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
import { Router } from '@angular/router';

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
  constructor(private store: Store, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    console.log('this.loginForm: ', this.loginForm.value);

    if (this.loginForm.valid) {
      // this.submitEM.emit(this.loginForm.value);

      this.store.dispatch(
        AuthApiActions.login({ loginData: this.loginForm.value })
      );
     
    }
  }
  // @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}

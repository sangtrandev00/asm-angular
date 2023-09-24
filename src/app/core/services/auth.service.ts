import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { IUser } from 'src/app/models/User';

export interface loginResponse {
  token: string;
  userId: string;
  message: string;
}

export interface signUpResponse {
  message: string;
  userId: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ISignUp {
  name: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginFormData: ILogin): Observable<loginResponse> {
    console.log('login form data: ' + loginFormData);

    return this.http.post<loginResponse>(
      `${BACKEND_DOMAIN}/auth/login`,
      loginFormData
    );
  }

  signUp(signUpFormData: ISignUp): Observable<signUpResponse> {
    return this.http.put<signUpResponse>(
      `${BACKEND_DOMAIN}/auth/signup`,
      signUpFormData
    );
  }
}

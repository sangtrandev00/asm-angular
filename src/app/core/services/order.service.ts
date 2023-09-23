import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { IUser } from 'src/app/models/User'; // Assuming you have a IUser interface for users.
import { map } from 'rxjs/operators';

export interface getUsersResponse {
  users: IUser[];
  message: string;
}

export interface getUserResponse {
  user: IUser;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<getUsersResponse> {
    return this.http
      .get<getUsersResponse>(`${BACKEND_DOMAIN}/admin/users`)
      .pipe(
        map((users) => {
          return users || [];
        })
      );
  }

  addUser(userData: Omit<IUser, '_id'>): Observable<getUserResponse> {
    return this.http.post<getUserResponse>(
      `${BACKEND_DOMAIN}/admin/user`,
      userData
    );
  }

  getUserById(id: string): Observable<getUserResponse> {
    return this.http
      .get<getUserResponse>(`${BACKEND_DOMAIN}/admin/users/${id}`)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  updateUser(
    id: string,
    userData: Omit<IUser, '_id'>
  ): Observable<getUserResponse> {
    return this.http
      .put<getUserResponse>(`${BACKEND_DOMAIN}/admin/user/${id}`, userData)
      .pipe(
        map((user) => {
          // console.log("user: ", user);
          return user;
        })
      );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${BACKEND_DOMAIN}/admin/users/${id}`).pipe(
      map((empty) => {
        return empty;
      })
    );
  }
}

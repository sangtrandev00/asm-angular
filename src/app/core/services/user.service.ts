import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { IUser } from 'src/app/models/User'; // Assuming you have a IUser interface for users.
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${BACKEND_DOMAIN}/admin/users`).pipe(
      map((users) => {
        return users || [];
      })
    );
  }

  addUser(userData: Omit<IUser, '_id'>): Observable<IUser> {
    return this.http.post<IUser>(`${BACKEND_DOMAIN}/admin/users`, userData);
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${BACKEND_DOMAIN}/admin/users/${id}`).pipe(
      map((user) => {
        return user;
      })
    );
  }

  updateUser(id: string, userData: Omit<IUser, '_id'>): Observable<IUser> {
    return this.http
      .put<IUser>(`${BACKEND_DOMAIN}/admin/users/${id}`, userData)
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

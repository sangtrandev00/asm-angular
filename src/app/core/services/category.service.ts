import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { ICategory } from 'src/app/models/Category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(`${BACKEND_DOMAIN}/admin/categories`)
      .pipe(
        map((categories) => {
          return categories || [];
        })
      );
  }

  addCategory(categoryData: Omit<ICategory, '_id'>): Observable<ICategory> {
    return this.http.post<ICategory>(
      `${BACKEND_DOMAIN}/admin/categories`,
      categoryData
    );
  }

  getCategoryById(id: string): Observable<ICategory> {
    return this.http
      .get<ICategory>(`${BACKEND_DOMAIN}/admin/categories/${id}`)
      .pipe(
        map((category) => {
          return category;
        })
      );
  }

  updateCategory(
    id: string,
    categoryData: Omit<ICategory, '_id'>
  ): Observable<ICategory> {
    return this.http
      .put<ICategory>(`${BACKEND_DOMAIN}/admin/categories/${id}`, categoryData)
      .pipe(
        map((category) => {
          // console.log("category: ", category);
          return category;
        })
      );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${BACKEND_DOMAIN}/admin/categories/${id}`).pipe(
      map((empty) => {
        return empty;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { ICategory } from 'src/app/models/Category';
import { map } from 'rxjs/operators';

export interface getCategoriesResponse {
  categories: ICategory[];
  message: string;
}

export interface getCategoryResponse {
  category: ICategory;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<getCategoriesResponse> {
    return this.http
      .get<getCategoriesResponse>(`${BACKEND_DOMAIN}/admin/categories`)
      .pipe(
        map((categories) => {
          return categories || [];
        })
      );
  }

  addCategory(
    categoryData: Omit<ICategory, '_id'>
  ): Observable<getCategoryResponse> {
    return this.http.post<getCategoryResponse>(
      `${BACKEND_DOMAIN}/admin/category`,
      categoryData
    );
  }

  getCategoryById(id: string): Observable<getCategoryResponse> {
    return this.http
      .get<getCategoryResponse>(`${BACKEND_DOMAIN}/admin/categories/${id}`)
      .pipe(
        map((category) => {
          return category;
        })
      );
  }

  updateCategory(
    id: string,
    categoryData: Omit<ICategory, '_id'>
  ): Observable<getCategoryResponse> {
    return this.http
      .put<getCategoryResponse>(
        `${BACKEND_DOMAIN}/admin/category/${id}`,
        categoryData
      )
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

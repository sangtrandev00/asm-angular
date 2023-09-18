import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { IProduct } from 'src/app/models/Product';
import { map } from 'rxjs/operators';

export interface getProductsResponse {
  products: IProduct[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<getProductsResponse> {
    return this.http
      .get<getProductsResponse>(`${BACKEND_DOMAIN}/admin/products`)
      .pipe(
        map((products) => {
          return products || [];
        })
      );
  }

  addProduct(productData: Omit<IProduct, '_id'>): Observable<IProduct> {
    return this.http.post<IProduct>(
      `${BACKEND_DOMAIN}/admin/products`,
      productData
    );
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${BACKEND_DOMAIN}/admin/products/${id}`)
      .pipe(
        map((product) => {
          return product;
        })
      );
  }

  updateProduct(
    id: string,
    productData: Omit<IProduct, '_id'>
  ): Observable<IProduct> {
    return this.http
      .put<IProduct>(`${BACKEND_DOMAIN}/admin/products/${id}`, productData)
      .pipe(
        map((product) => {
          // console.log("product: ", product);
          return product;
        })
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${BACKEND_DOMAIN}/admin/products/${id}`).pipe(
      map((empty) => {
        return empty;
      })
    );
  }
}

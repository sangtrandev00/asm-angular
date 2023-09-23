import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
// import { IUser } from 'src/app/models/User'; // Assuming you have a IUser interface for users.
import { map } from 'rxjs/operators';
import { IOrder } from 'src/app/models/Order';

export interface getOrdersResponse {
  orders: IOrder[];
  message: string;
}

export interface getOrderResponse {
  order: IOrder;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<getOrdersResponse> {
    return this.http
      .get<getOrdersResponse>(`${BACKEND_DOMAIN}/admin/orders`)
      .pipe(
        map((orders) => {
          return orders || [];
        })
      );
  }

  addOrder(orderData: Omit<IOrder, '_id'>): Observable<getOrderResponse> {
    return this.http.post<getOrderResponse>(
      `${BACKEND_DOMAIN}/admin/order`,
      orderData
    );
  }

  getOrderById(id: string): Observable<getOrderResponse> {
    return this.http
      .get<getOrderResponse>(`${BACKEND_DOMAIN}/admin/orders/${id}`)
      .pipe(
        map((order) => {
          return order;
        })
      );
  }

  updateOrder(
    id: string,
    orderData: Omit<IOrder, '_id'>
  ): Observable<getOrderResponse> {
    return this.http
      .put<getOrderResponse>(`${BACKEND_DOMAIN}/admin/order/${id}`, orderData)
      .pipe(
        map((order) => {
          // console.log("order: ", order);
          return order;
        })
      );
  }

  patchOrder(id: string, orderData: IOrder): Observable<getOrderResponse> {
    return this.http
      .patch<getOrderResponse>(`${BACKEND_DOMAIN}/admin/order/${id}`, orderData)
      .pipe(
        map((order) => {
          // console.log("order: ", order);
          return order;
        })
      );
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${BACKEND_DOMAIN}/admin/orders/${id}`).pipe(
      map((empty) => {
        return empty;
      })
    );
  }
}

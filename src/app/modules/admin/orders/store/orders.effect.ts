import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrdersApiActions } from './orders.actions'; // Updated import
import { OrderService } from 'src/app/core/services/order.service'; // Updated import
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService, // Updated service name
    private toastr: ToastrService
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersApiActions.getOrderList), // Updated action name
      switchMap(() =>
        this.orderService.getOrders().pipe(
          map(
            (ordersResponse) =>
              OrdersApiActions.getOrderListSuccess({
                orders: ordersResponse.orders,
              }) // Updated action name
          ),
          catchError(
            (error) => of(OrdersApiActions.getOrderListFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersApiActions.addOrder), // Updated action name
      switchMap((action) =>
        this.orderService.addOrder(action.order).pipe(
          map((newOrderResponse) => {
            // Add order toast here ???
            this.toastr.success('Order added', 'Add Order Successfully');

            return OrdersApiActions.addOrderSuccess({
              order: newOrderResponse.order, // Updated property name
            });
          }),
          catchError((error) => {
            this.toastr.error('Order not added', 'Add Order Failed');

            return of(OrdersApiActions.addOrderFailure({ error })); // Updated action name
          })
        )
      )
    )
  );

  getOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersApiActions.getOrderById), // Updated action name
      switchMap((action) =>
        this.orderService.getOrderById(action.orderId).pipe(
          map((orderResponse) => {
            return OrdersApiActions.getOrderByIdSuccess({
              order: orderResponse.order,
            }); // Updated action name
          }),
          catchError(
            (error) => of(OrdersApiActions.getOrderByIdFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersApiActions.updateOrder), // Updated action name
      switchMap((action) =>
        this.orderService.updateOrder(action.id, action.order).pipe(
          map((orderResponse) => {
            this.toastr.success('Order updated', 'Update Order Successfully');

            return OrdersApiActions.updateOrderSuccess({
              order: orderResponse.order,
            }); // Updated action name
          }),
          catchError((error) => {
            this.toastr.error('Order not updated', 'Update Order Failed');

            return of(OrdersApiActions.updateOrderFailure({ error })); // Updated action name
          })
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersApiActions.deleteOrder), // Updated action name
      switchMap((action) =>
        this.orderService.deleteOrder(action.id).pipe(
          map(() => {
            this.toastr.success(
              'Order deleted',
              `Delete Order #${action.id} Successfully`
            );

            return OrdersApiActions.deleteOrderSuccess({ id: action.id }); // Updated action name
          }),
          catchError((error) => {
            this.toastr.error(
              'Order not deleted',
              `Delete Order #${action.id} Failed`
            );

            return of(OrdersApiActions.deleteOrderFailure({ error })); // Updated action name
          })
        )
      )
    )
  );
}

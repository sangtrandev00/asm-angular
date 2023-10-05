import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IOrder } from 'src/app/models/Order';
import { OrdersApiActions } from 'src/app/modules/admin/orders/store/orders.actions';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private store: Store
  ) {}

  deleteOrder() {
    console.log('id: ', this.dialogRef);

    // console.log('product Id: ', this.data);

    const orderId = this.data._id as string;

    this.store.dispatch(OrdersApiActions.deleteOrder({ id: orderId }));
  }
}

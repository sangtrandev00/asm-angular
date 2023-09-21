import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProductsApiActions } from '../../store/products.actions';
import { IProduct } from 'src/app/models/Product';

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
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private store: Store
  ) {}

  deleteProduct() {
    console.log('id: ', this.dialogRef);

    // this.store.dispatch(ProductsApiActions.deleteProduct({ id: productId }));

    // console.log('product Id: ', this.data);

    const productId = this.data._id as string;

    console.log('product Id: ', productId);

    this.store.dispatch(ProductsApiActions.deleteProduct({ id: productId }));
  }
}

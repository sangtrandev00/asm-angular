import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from 'src/app/models/Order';
import { selectOrders } from '../../store/orders.selectors';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgFor,
  ],
})
export class OrderDialogComponent {
  orders: IOrder[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private store: Store,
    private toastr: ToastrService
  ) {
    this.store.select(selectOrders).subscribe((orders) => {
      this.orders = orders;
    });
  }

  ngOnInit(): void {
    // this.categoryService.getCategories().subscribe((categoriesResponse) => {
    //   this.store.dispatch(
    //     CategoriesApiActions.getCategoryList({
    //       categories: categoriesResponse.categories,
    //     })
    //   );
    // });
  }

  productForm = new FormGroup({
    // name: new FormControl(this.data.name, [Validators.required]),
    // oldPrice: new FormControl(this.data.oldPrice, [
    //   Validators.required,
    //   Validators.min(0),
    // ]),
    // stockQty: new FormControl(this.data.stockQty, [
    //   Validators.required,
    //   Validators.min(0),
    // ]),
    // images: new FormControl(this.data.images, [Validators.required]),
    // thumbnail: new FormControl(this.data.thumbnail, [Validators.required]),
    // shortDesc: new FormControl(this.data.shortDesc, [Validators.required]),
    // fullDesc: new FormControl(this.data.fullDesc, [Validators.required]),
    // categoryId: new FormControl(this.data.categoryId, [Validators.required]),
    // discount: new FormControl(this.data.discount, [
    //   Validators.required,
    //   Validators.min(0),
    //   Validators.max(100),
    // ]),
    _id: new FormControl(this.data._id),
  });
}

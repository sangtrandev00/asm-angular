import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IProduct } from 'src/app/models/Product';
import { ProductsApiActions } from '../../store/products.actions';
import { Store } from '@ngrx/store';
// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class ProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private store: Store
  ) {}

  productForm = new FormGroup({
    name: new FormControl(this.data.name),
    oldPrice: new FormControl(this.data.oldPrice),
    stockQty: new FormControl(this.data.stockQty),
    images: new FormControl(this.data.images),
    thumbnail: new FormControl(this.data.thumbnail),
    shortDesc: new FormControl(this.data.shortDesc),
    fullDesc: new FormControl(this.data.fullDesc),
    categoryId: new FormControl(this.data.categoryId),
    discount: new FormControl(this.data.discount),
    _id: new FormControl(this.data._id),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('save submitted!', this.productForm.value);

    console.log(this.data);

    // Async dispatch here ???
    const formData: Omit<IProduct, '_id'> = {
      name: this.productForm.value.name as string,
      oldPrice: this.productForm.value.oldPrice as number,
      stockQty: this.productForm.value.stockQty as number,
      thumbnail: this.productForm.value.thumbnail as string,
      images: this.productForm.value.images as string,
      shortDesc: this.productForm.value.shortDesc as string,
      fullDesc: this.productForm.value.fullDesc as string,
      discount: this.productForm.value.discount as number,
    };

    if (this.data._id) {
      this.store.dispatch(
        ProductsApiActions.updateProduct({
          id: this.data._id,
          product: formData,
        })
      );
    } else {
      this.store.dispatch(ProductsApiActions.addProduct({ product: formData }));
    }

    // Async action
    // if(this.postId) {
    //   this.store.dispatch(PostsApiActions.updatePost({id: this.postId, post: formData}));

    //   // console.log("update post");

    // }else {

    //   console.log("create post");

    //   this.store.dispatch(PostsApiActions.addPost({ post: formData }));
    // }

    // Sử lý những Effect call API như vậy thì làm như thế nào ?
  }
}

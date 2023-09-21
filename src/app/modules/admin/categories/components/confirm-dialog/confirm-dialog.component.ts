import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/models/Category';
import { CategoriesApiActions } from '../../store/categories.actions';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory,
    private store: Store
  ) {}

  deleteCategory() {
    console.log('id: ', this.dialogRef);

    // this.store.dispatch(Category.deleteCategory({ id: productId }));

    // console.log('product Id: ', this.data);

    const categoryId = this.data._id as string;

    // console.log('product Id: ', categoryId);

    this.store.dispatch(
      CategoriesApiActions.deleteCategory({ id: categoryId })
    );
  }
}

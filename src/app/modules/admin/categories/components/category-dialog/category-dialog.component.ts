import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/models/Category';
import { CategoriesApiActions } from '../../store/categories.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
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
export class CategoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory,
    private store: Store,
    private toastr: ToastrService
  ) {}

  categoryForm = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    cateImage: new FormControl(this.data.cateImage, [Validators.required]),
    // cateImageFile: new FormControl(''),
    description: new FormControl(this.data.description, [Validators.required]),
    products: new FormControl(this.data.products, [Validators.required]),
    _id: new FormControl(this.data._id),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('save submitted!', this.categoryForm.value);

    console.log(this.data);

    if (!this.categoryForm.valid) {
      console.log('Form invalid!');
      this.toastr.error('Form invalid!', 'Some field went wrong!');
      return;
    }

    // Async dispatch here ???
    const formData: Omit<ICategory, '_id'> = {
      name: this.categoryForm.value.name as string,
      cateImage: this.categoryForm.value.cateImage as string,
      description: this.categoryForm.value.description as string,
      products: this.categoryForm.value.products as number,
    };

    if (this.data._id) {
      this.store.dispatch(
        CategoriesApiActions.updateCategory({
          id: this.data._id,
          category: formData,
        })
      );
    } else {
      this.store.dispatch(
        CategoriesApiActions.addCategory({ category: formData })
      );
    }

    // Sử lý những Effect call API như vậy thì làm như thế nào ?
  }
}

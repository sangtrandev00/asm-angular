import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IProduct } from 'src/app/models/Product';
import { ProductsApiActions } from '../../store/products.actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { ICategory } from 'src/app/models/Category';
import { selectCategories } from '../../../categories/store/categories.selectors';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoriesApiActions } from '../../../categories/store/categories.actions';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
// export interface DialogData {
//   animal: string;
//   name: string;
// }
interface Food {
  value: string;
  viewValue: string;
}

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
    MatSelectModule,
    NgFor,
  ],
})
export class ProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private store: Store,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.store.select(selectCategories).subscribe((categories) => {
      this.categories = categories;
    });
  }

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categoriesResponse) => {
      this.store.dispatch(
        CategoriesApiActions.getCategoryList({
          categories: categoriesResponse.categories,
        })
      );
    });
  }

  productForm = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    oldPrice: new FormControl(this.data.oldPrice, [
      Validators.required,
      Validators.min(0),
    ]),
    stockQty: new FormControl(this.data.stockQty, [
      Validators.required,
      Validators.min(0),
    ]),
    images: new FormControl(this.data.images, [Validators.required]),
    thumbnail: new FormControl(this.data.thumbnail, [Validators.required]),
    shortDesc: new FormControl(this.data.shortDesc, [Validators.required]),
    fullDesc: new FormControl(this.data.fullDesc, [Validators.required]),
    categoryId: new FormControl(this.data.categoryId, [Validators.required]),
    discount: new FormControl(this.data.discount, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    _id: new FormControl(this.data._id),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('save submitted!', this.productForm.value);

    console.log('category: ', this.productForm.value.categoryId);
    // const cateId = this.productForm.value.categoryId;

    const categoryId = this.productForm.value.categoryId as string;
    const cateName = this.categories.find((c) => c._id === categoryId)?.name;
    // const currentCate = this.categories.find((c) => c._id === cateId);

    if (this.productForm.invalid) {
      this.toastr.error('Form invalid!', 'Some field went wrong!');
      return;
    }

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
      categoryId: {
        _id: categoryId,
        name: cateName as string,
      },
    };

    console.log('form data: ', formData);

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
  }
}

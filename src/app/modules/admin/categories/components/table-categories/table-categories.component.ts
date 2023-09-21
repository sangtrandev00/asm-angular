import { NgIf } from '@angular/common';
import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { CategoryService } from 'src/app/core/services/category.service';
import { ICategory } from 'src/app/models/Category';
import { selectCategories } from '../../store/categories.selectors';
import { CategoriesApiActions } from '../../store/categories.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
})
export class TableCategoriesComponent {
  displayedColumns: string[] = [
    '#ID',
    'Name',
    'Image',
    'Category',
    'FinalPrice',
    'Stock',
    'Actions',
  ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource!: MatTableDataSource<ICategory>;
  BACKEND_DOMAIN = BACKEND_DOMAIN;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  _id!: string;
  name!: string;
  cateImage!: string;
  description!: string;
  createdAt!: string;
  updatedAt!: string;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public confirmDialog: MatDialog,
    private store: Store
  ) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);

    this.store.select(selectCategories).subscribe((categories) => {
      console.log('data: ', categories);

      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data.categories);

      this.dataSource = new MatTableDataSource(data.categories);
      // console.log('data source: ', this.dataSource);
      // console.log('paginator: ', this.dataSource.paginator);
      // console.log('this paginator: ', this.paginator);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.store.dispatch(
        CategoriesApiActions.getCategoryList({ categories: data.categories })
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    console.log('on changes: ', changes);
  }

  ngAfterViewInit() {
    // console.log('after view init');
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(productId?: string) {
    // const dialogRef = this.dialog.open(ProductDialogComponent, {
    //   data: {
    //     _id: '',
    //     name: this.name || '',
    //     oldPrice: this.oldPrice || 0,
    //     discount: this.discount || 0,
    //     images: this.images || '',
    //     thumbnail: this.thumbnail || '',
    //     stockQty: this.stockQty || 1,
    //     shortDesc: this.shortDesc || '',
    //     fullDesc: this.fullDesc || '',
    //   },
    //   width: '600px',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed', result);
    //   this.product.name = result;
    // });
  }

  openEditModal(currentProduct: ICategory) {
    // console.log('current product: ', currentProduct);
    // const dialogRef = this.dialog.open(ProductDialogComponent, {
    //   data: {
    //     name: currentProduct.name || '',
    //     oldPrice: currentProduct.oldPrice || 0,
    //     discount: currentProduct.discount || 0,
    //     images: currentProduct.images || '',
    //     thumbnail: currentProduct.thumbnail || '',
    //     stockQty: currentProduct.stockQty || 1,
    //     shortDesc: currentProduct.shortDesc || '',
    //     fullDesc: currentProduct.fullDesc || '',
    //     _id: currentProduct._id || '',
    //   },
    //   width: '600px',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed', result);
    //   // this.product = result;
    // });
  }

  openConfirmDialog(productId: string) {
    this.confirmDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        _id: productId,
      },
    });
  }
}

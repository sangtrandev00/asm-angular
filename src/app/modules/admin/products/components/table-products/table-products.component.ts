import {
  AfterViewInit,
  Component,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/models/Product';
import { BACKEND_DOMAIN } from '../../../../../constant/base-url';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { ProductsApiActions } from '../../store/products.actions';
import { selectLoading, selectProducts } from '../../store/products.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
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
    DatePipe,
    MatProgressSpinnerModule,
  ],
})
export class TableProductsComponent {
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  displayedColumns: string[] = [
    // '#ID',
    'Name',
    'Image',
    'Category',
    'FinalPrice',
    'Stock',
    'CreatedAt',
    'Actions',
  ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource!: MatTableDataSource<IProduct>;
  BACKEND_DOMAIN = BACKEND_DOMAIN;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  product!: IProduct;
  name!: string;
  oldPrice!: number;
  discount!: number;
  images!: string;
  thumbnail!: string;
  stockQty!: number;
  shortDesc!: string;
  fullDesc!: string;

  isProductsLoading: boolean = false;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    public confirmDialog: MatDialog,
    private store: Store
  ) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);

    this.store.select(selectProducts).subscribe((products) => {
      console.log('data: ', products);

      const transformProducts = products.map((product) => {
        return {
          ...product,
          thumbnail: product.thumbnail?.startsWith('http')
            ? product.thumbnail
            : `${BACKEND_DOMAIN}/${product.thumbnail}`,
        };
      });

      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.store.select(selectLoading).subscribe((loading) => {
      this.isProductsLoading = loading;
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      console.log(data.products);

      this.dataSource = new MatTableDataSource(data.products);
      console.log('data source: ', this.dataSource);
      console.log('paginator: ', this.dataSource.paginator);
      console.log('this paginator: ', this.paginator);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.store.dispatch(
        ProductsApiActions.getProductList({ products: data.products })
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
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        _id: '',
        name: this.name || '',
        oldPrice: this.oldPrice || 0,
        discount: this.discount || 0,
        images: this.images || '',
        thumbnail: this.thumbnail || '',
        stockQty: this.stockQty || 1,
        shortDesc: this.shortDesc || '',
        fullDesc: this.fullDesc || '',
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.product.name = result;
    });
  }

  openEditModal(currentProduct: IProduct) {
    console.log('current product: ', currentProduct);

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        name: currentProduct.name || '',
        oldPrice: currentProduct.oldPrice || 0,
        discount: currentProduct.discount || 0,
        images: currentProduct.images || '',
        thumbnail: currentProduct.thumbnail || '',
        stockQty: currentProduct.stockQty || 1,
        shortDesc: currentProduct.shortDesc || '',
        fullDesc: currentProduct.fullDesc || '',
        _id: currentProduct._id || '',
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // this.product = result;
    });
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

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }

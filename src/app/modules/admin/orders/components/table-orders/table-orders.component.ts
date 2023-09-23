import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/models/Order';
import { OrdersApiActions } from '../../store/orders.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { selectLoading, selectOrders } from '../../store/orders.selectors';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.scss'],
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
export class TableOrdersComponent {
  displayedColumns: string[] = [
    // '#ID',
    'Customer',
    'Total',
    'Status',
    'Payment',
    'DateOrder',
    'QtyItems',
    'Actions',
  ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource!: MatTableDataSource<IOrder>;
  BACKEND_DOMAIN = BACKEND_DOMAIN;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  name!: string;
  oldPrice!: number;
  discount!: number;
  images!: string;
  thumbnail!: string;
  stockQty!: number;
  shortDesc!: string;
  fullDesc!: string;

  isOrdersLoading: boolean = false;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    public confirmDialog: MatDialog,
    private store: Store
  ) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);

    this.store.select(selectOrders).subscribe((orders) => {
      console.log('data: ', orders);

      // const transformorders = orders.map((product) => {
      //   return {
      //     ...product,
      //     thumbnail: product.thumbnail?.startsWith('http')
      //       ? product.thumbnail
      //       : `${BACKEND_DOMAIN}/${product.thumbnail}`,
      //   };
      // });

      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.store.select(selectLoading).subscribe((isLoading) => {
      this.isOrdersLoading = isLoading;
    });
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      console.log(data.orders);

      this.dataSource = new MatTableDataSource(data.orders);
      console.log('data source: ', this.dataSource);
      console.log('paginator: ', this.dataSource.paginator);
      console.log('this paginator: ', this.paginator);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.store.dispatch(
        OrdersApiActions.getOrderList({ orders: data.orders })
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

  openModal(orderId?: string) {
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

  openEditModal(currentProduct: IOrder) {
    console.log('current product: ', currentProduct);

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

  openConfirmDialog(orderId: string) {
    this.confirmDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        _id: orderId,
      },
    });
  }
}

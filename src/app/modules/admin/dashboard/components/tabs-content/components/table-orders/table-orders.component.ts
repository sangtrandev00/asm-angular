import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectLoading } from 'src/app/auth/store/auth.selectors';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/models/Order';
import { OrdersApiActions } from 'src/app/modules/admin/orders/store/orders.actions';
import { selectOrders } from 'src/app/modules/admin/orders/store/orders.selectors';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  @Input() status: string = '';

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
      console.log('data orders: ', orders); // Khó hiểu bug này quá ???

      const ordersFiltered = orders.filter(
        (order) => order.status === this.status
      );

      this.dataSource = new MatTableDataSource(ordersFiltered);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.store.select(selectLoading).subscribe((isLoading) => {
      console.log('Is loading orders: ', isLoading);

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

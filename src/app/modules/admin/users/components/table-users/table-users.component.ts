import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/models/User';
import { selectLoading, selectUsers } from '../../store/users.selectors';
import { UsersActions, UsersApiActions } from '../../store/users.actions';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
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
    ToastrModule,
    MatProgressSpinnerModule,
  ],
})
export class TableUsersComponent {
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  displayedColumns: string[] = [
    // '#ID',
    'Name',
    'Avatar',
    'Email',
    'Phone',
    'Address',
    'Role',
    'Payment',
    'Actions',
  ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource!: MatTableDataSource<IUser>;
  BACKEND_DOMAIN = BACKEND_DOMAIN;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  name!: string;
  avatar!: string;
  email!: number;
  phone!: string;
  address!: string;
  role!: number;
  payment!: string;

  isUsersLoading: boolean = false;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public confirmDialog: MatDialog,
    private store: Store,
    private toastr: ToastrService
  ) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);

    this.store.select(selectUsers).subscribe((users) => {
      console.log('data: ', users);

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.store.select(selectLoading).subscribe((isLoading) => {
      this.isUsersLoading = isLoading;
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data.users);

      this.dataSource = new MatTableDataSource(data.users);
      console.log('data source: ', this.dataSource);
      console.log('paginator: ', this.dataSource.paginator);
      console.log('this paginator: ', this.paginator);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.store.dispatch(UsersApiActions.getUserList({ users: data.users }));
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

  openModal(userId?: string) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        _id: '',
        name: this.name || '',
        avatar: this.avatar || '',
        email: this.email || '',
        phone: this.phone || '',
        address: this.address || '',
        role: this.role || '',
        payment: this.payment || '',
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  openEditModal(currentUser: IUser) {
    // console.log('current product: ', currentUser);

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        name: currentUser.name || '',
        avatar: currentUser.avatar || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        role: currentUser.role || '',
        userRole: currentUser.role || 'subadmin',
        payment: currentUser.payment || '',
        password: currentUser.password || '',
        _id: currentUser._id || '',
      },
      width: '600px',
    });

    this.store.dispatch(
      UsersActions.startEditUser({ id: currentUser._id || '' })
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // this.product = result;
    });
  }

  openConfirmDialog(userId: string) {
    this.confirmDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        _id: userId,
      },
    });
  }

  showNotification() {
    console.log('click showNotification');

    this.toastr.success('Hello world', 'toast fun!');
  }
}

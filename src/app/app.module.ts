import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './shared/components/layout/side-bar/side-bar.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productsReducer } from './modules/admin/products/store/products.reducer';
import { categoriesReducer } from './modules/admin/categories/store/categories.reducer';
import { usersReducer } from './modules/admin/users/store/users.reducer';
import { CategoryEffects } from './modules/admin/categories/store/categories.effect';
import { ProductEffects } from './modules/admin/products/store/products.effect';
import { UserEffects } from './modules/admin/users/store/users.effect';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ButtonComponent } from './shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { OrdersModule } from './modules/admin/orders/orders.module';
import { ordersReducer } from './modules/admin/orders/store/orders.reducer';
@NgModule({
  declarations: [AppComponent, ButtonComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }), // ToastrModule added
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HeaderComponent,
    SideBarComponent,
    OrdersModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    StoreModule.forRoot({
      products: productsReducer,
      categories: categoriesReducer,
      users: usersReducer,
      orders: ordersReducer,
    }),
    EffectsModule.forRoot([CategoryEffects, ProductEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

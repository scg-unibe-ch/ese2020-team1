import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import { UsernameValidator } from './user/user-registration/validators/username.validator.service';
import { ProductRegistrationComponent } from './product/product-registration/product-registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { BrowseComponent } from './product/browse/browse.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductModificationComponent } from '././product/product-modification/product-modification.component';
import { ProfileComponent } from "./user/profile/profile.component";
import { ProductDisplayComponent } from './product/product-display/product-display.component';
import { ProductsByUserComponent } from './user/profile/products-by-user/products-by-user.component';
import { AdminDashboardComponent } from './user/profile/admin-dashboard/admin-dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductPurchaseComponent } from './product/product-purchase/product-purchase.component';
import { MatStepperModule } from '@angular/material/stepper';
import { UserNotificationsComponent } from './user/profile/user-notifications/user-notifications.component';
import { UserInformationComponent } from './user/profile/user-information/user-information.component';
import { FilterPipe } from './product/browse/filter.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { PurchaseRequestsComponent } from './user/profile/purchase-requests/purchase-requests.component';
import { ActivityLogComponent } from './user/profile/activity-log/activity-log.component';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user/user-login', component: UserLoginComponent},
  { path: 'user/user-registration', component: UserRegistrationComponent },
  { path: 'product/browse', component: BrowseComponent },
  {
    path: 'product/product-modification',
    component: ProductModificationComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'product/browse', pathMatch: 'full' },
  { path: 'product/display', component: ProductDisplayComponent },
  { path: 'product/purchase',
    component: ProductPurchaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/product-registration',
    component: ProductRegistrationComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    ProductRegistrationComponent,
    NavbarComponent,
    BrowseComponent,
    ProductModificationComponent,
    ProfileComponent,
    ProductDisplayComponent,
    ProductsByUserComponent,
    AdminDashboardComponent,
    ProductPurchaseComponent,
    UserNotificationsComponent,
    UserInformationComponent,
    FilterPipe,
    PurchaseRequestsComponent,
    ActivityLogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatPasswordStrengthModule.forRoot(),
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoutes),
    MatStepperModule,
    MatSliderModule,
  ],
  providers: [
    UsernameValidator,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

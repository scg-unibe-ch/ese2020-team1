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
import { BrowseComponent } from './browse/browse.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductModificationComponent } from './product/product-modification/product-modification.component';
import { ProfileComponent } from "./profile/profile.component";
import { ProductDisplayComponent } from './product/product-display/product-display.component';
import { ProductsByUserComponent } from './product/products-by-user/products-by-user.component';

const appRoutes: Routes = [
  { path: 'user/user-login', component: UserLoginComponent},
  { path: 'user/user-registration', component: UserRegistrationComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'product/product-modification', component: ProductModificationComponent},
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: 'product/display', component: ProductDisplayComponent},
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
    ProductsByUserComponent
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UsernameValidator,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

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
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { UsernameValidator } from './user-registration/validators/username.validator.service';
import { NavbarComponent } from './navbar/navbar.component';
import{Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

<<<<<<< Updated upstream
const appRoutes:Routes=[
  { path: 'app-user-login', 
  component: UserLoginComponent},
  { path: 'user-registration', component: UserRegistrationComponent}
=======
const appRoutes: Routes = [
  { path: 'user-login', component: UserLoginComponent},
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'browse', component: BrowseComponent},
  { path: 'product-registration', component: ProductRegistrationComponent},
  { path: '', redirectTo: 'bro, wse', pathMatch: 'full'}
>>>>>>> Stashed changes
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    NavbarComponent,
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
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
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
  ],
})
export class AppModule { }

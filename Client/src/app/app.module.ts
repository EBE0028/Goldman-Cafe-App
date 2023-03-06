import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { OrderComponent } from './order/order.component'
import { FormsModule } from '@angular/forms';
import {DatePipe, DecimalPipe} from '@angular/common'
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ViewMyOrdersComponent } from './view-my-orders/view-my-orders.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckUserIDComponent } from './check-user-id/check-user-id.component';
import { ExceptionHandlingPageComponent } from './exception-handling-page/exception-handling-page.component';
import { UnknownPageErrorComponent } from './unknown-page-error/unknown-page-error.component';
import { FooterComponent } from './footer/footer.component';

const routes : Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'ViewOrder', component: ViewMyOrdersComponent },
  { path: 'MenuItems', component: MenuItemComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Error', component: ExceptionHandlingPageComponent },
  { path: '**', component:UnknownPageErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    AccountComponent,
    OrderComponent,
    PaymentComponent,
    SignupComponent,
    ViewMyOrdersComponent,
    MenuItemComponent,
    ForgotPasswordComponent,
    CheckUserIDComponent,
    ExceptionHandlingPageComponent,
    UnknownPageErrorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatSliderModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ DecimalPipe, DatePipe,MatStepper ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}

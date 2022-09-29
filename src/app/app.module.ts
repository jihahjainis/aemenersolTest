import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { DashboardService } from './services/dashboard.service';

import { RouterModule } from '@angular/router';
import { D3DonutComponent } from './d3-donut/d3-donut.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { D3BarComponent } from './d3-bar/d3-bar.component';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    D3DonutComponent,
    DashboardPageComponent,
    D3BarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginPageComponent},
      { path: '', component: DashboardPageComponent, canActivate: [AuthGuard] },

      // otherwise redirect to dashboard
      { path: '**', redirectTo: '' }
    ]),
  ],
  providers: [
    AuthenticationService,
    AlertService,
    DashboardService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

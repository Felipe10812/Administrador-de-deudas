import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginComponent from './components/login/login.component';
import SigInComponent from './components/sig-in/sig-in.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import DeudoresComponent from './components/Administrador/deudores/deudores.component';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginComponent,
    RouterModule,
    SigInComponent,
    DashboardComponent,
    DeudoresComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'Frontend';
}

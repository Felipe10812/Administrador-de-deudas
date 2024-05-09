import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginComponent from './components/login/login.component';
import SigInComponent from './components/sig-in/sig-in.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, RouterModule, SigInComponent, DashboardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'Frontend';
}

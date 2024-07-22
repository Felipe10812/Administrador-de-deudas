import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DeudasService } from '../../services/deudas.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router,) { }

  ngOnInit(): void {

  }

  Salir() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}

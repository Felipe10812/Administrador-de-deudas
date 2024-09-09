import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { loginUsuario } from '../../interfaces/User';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, SpinnerComponent, MatInputModule,
    MatFormFieldModule, MatCardModule, FormsModule, MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private _errorService: ErrorService
  ) { }

  get getCorreo() {
    return this.formLogin.get('Correo') as FormControl;
  }

  get getContrasena() {
    return this.formLogin.get('Contrasena') as FormControl;
  }

  formLogin = new FormGroup({
    'Correo': new FormControl('', [Validators.required, Validators.email]),
    'Contrasena': new FormControl('', Validators.required)
  })

  ngOnInit(): void { }

  Login() {
    // Se validan los datos ingresados por el usuario 
    if (this.getCorreo.value == '' || this.getContrasena.value == '') {
      this.toastr.error('Todos los campos son requeridos', 'Error');
      return;
    }

    const loginUsuario: loginUsuario = {
      Correo: this.getCorreo.value,
      password: this.getContrasena.value
    }

    this.loading = true;
    this.userService.login(loginUsuario).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      },
    })
  }
}

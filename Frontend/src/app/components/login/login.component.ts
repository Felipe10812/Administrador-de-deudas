import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { loginUsuario } from '../../interfaces/User';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
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

    this.userService.login(loginUsuario).subscribe({
      next: (data) => {
        console.log(data);
      }
    })

  }


}

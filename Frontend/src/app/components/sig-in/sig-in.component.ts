import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';


@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent
  ],

  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css'
})
export default class SigInComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  get getNombre() {
    return this.formRegistroUser.get('Nombre') as FormControl;
  }
  get getCorreo() {
    return this.formRegistroUser.get('Correo') as FormControl;
  }
  get getContrasena() {
    return this.formRegistroUser.get('Contraseña') as FormControl;
  }
  get getConfirmarContrasena() {
    return this.formRegistroUser.get('ConfirmarContraseña') as FormControl;
  }

  formRegistroUser = new FormGroup({
    'Nombre': new FormControl('', Validators.required),
    'Correo': new FormControl('', [Validators.required, Validators.email]),
    'Contraseña': new FormControl('', Validators.required),
    'ConfirmarContraseña': new FormControl('', Validators.required)
  });

  loading: boolean = false;

  ngOnInit(): void { }

  addUser() {
    // Se validan los datos ingresados por el usuario 
    if (this.getNombre.value == '' || this.getCorreo.value == '' || this.getContrasena.value == '' || this.getConfirmarContrasena.value == '') {
      this.toastr.error('Todos los campos son requeridos', 'Error');
      return;
    }
    if (this.getContrasena.value != this.getConfirmarContrasena.value) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }
    const usuario: Usuario = {
      userName: this.getNombre.value,
      password: this.getContrasena.value,
      Correo: this.getCorreo.value
    }

    this.loading = true;
    this.userService.sigIn(usuario).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success('El usuario fue registrado con éxito', 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if (e.status === 409) {
          this.toastr.error('El correo electrónico ya está registrado', 'Error');
        } else {
          this.toastr.error('Hubo un error al registrar el usuario', 'Error');
        }
      },
      complete: () => console.info('Complete')
    })

  }

}

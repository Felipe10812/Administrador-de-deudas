import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
    MatTooltipModule
  ],

  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css'
})
export default class SigInComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private _errorService: ErrorService
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
  }, { validators: this.passwordMatchValidator });

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
      userName: this.getNombre.value.trim(),
      password: this.getContrasena.value.trim(),
      Correo: this.getCorreo.value.trim()
    }

    this.loading = true;
    this.userService.sigIn(usuario).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success('El usuario fue registrado con éxito', 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })
  }

  passwordStrength: number = 0;

  // Método para evaluar la fuerza de la contraseña
  evaluarSeguridad(event: any) {
    const password = event.target.value;
    this.passwordStrength = this.calcularSeguridad(password);
  }

  calcularSeguridad(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  }

  // Validador personalizado para verificar coincidencia de contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('Contraseña')?.value;
    const confirmPassword = control.get('ConfirmarContraseña')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

}

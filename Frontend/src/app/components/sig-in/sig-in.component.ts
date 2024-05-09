import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css'
})
export default class SigInComponent implements OnInit {

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

  ngOnInit(): void {

  }
  addUser() {

  }


}

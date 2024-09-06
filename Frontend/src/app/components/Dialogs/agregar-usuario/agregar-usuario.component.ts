import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import GestorUsuariosComponent from '../../Administrador/gestor-usuarios/gestor-usuarios.component';
import { DropdownService } from '../../../services/dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';
import { Roles } from '../../../interfaces/Dropdown';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent implements OnInit {
  formRegistroUsuario: FormGroup;
  Roles: Roles[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { IdUsuario: number },
    private dialogRef: MatDialogRef<GestorUsuariosComponent>,
    private _dropdownService: DropdownService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
  ) {
    this.formRegistroUsuario = new FormGroup({

    })
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this._dropdownService.getDropRoles().subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && Array.isArray(data[0])) {
          this.Roles = data[0];
        } else {
          this.toastr.error('Estructura de datos inesperada:', data);
        }
      },
      error: (error: any) => {
        this.toastr.error('Ocurrió un error', error);
      }
    });
  }

  onSubmit() {

  }

  onCancel() {
    this.dialogRef.close();
  }

}

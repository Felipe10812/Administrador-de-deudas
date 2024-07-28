import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgregarDeuda } from '../../../interfaces/Deudas';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DropdownService } from '../../../services/dropdown.service';
import { Medio_Deuda_Prestamo } from '../../../interfaces/Dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  agregarDeuda!: AgregarDeuda;
  formRegistroDeuda: FormGroup;
  mediosPrestamo: Medio_Deuda_Prestamo[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AgregarDeuda,
    private dialogRef: MatDialogRef<AgregarComponent>,
    private _dropdownService: DropdownService
  ) {
    this.agregarDeuda = data;
    this.formRegistroDeuda = new FormGroup({
      MedioPrestamo: new FormControl('', Validators.required),
      FechaPrestamo: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      Cantidad: new FormControl('', [Validators.required, this.decimalValidator(2)]),
      Motivo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getMediosPrestamoPagos();
  }

  getMediosPrestamoPagos() {
    this._dropdownService.getMediosPrestamo().subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && Array.isArray(data[0])) {
          this.mediosPrestamo = data[0];
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      error: (error: any) => {
        console.error('Ocurrió un error', error);
      },
      complete: () => {
        console.log('Dropdown cargado con éxito');
      }
    });
  }

  get getMedioPrestamo() {
    return this.formRegistroDeuda.get('MedioPrestamo');
  }

  get getFechaPrestamo() {
    return this.formRegistroDeuda.get('FechaPrestamo');
  }

  get getCantidad() {
    return this.formRegistroDeuda.get('Cantidad');
  }

  get getMotivo() {
    return this.formRegistroDeuda.get('Motivo');
  }

  onSubmit() {
    if (this.formRegistroDeuda.valid) {
      console.log('Formulario válido, enviar datos:', this.formRegistroDeuda.value);
      this.dialogRef.close();
    } else {
      console.log('Formulario no válido');
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  decimalValidator(decimalPlaces: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value) {
        const regex = new RegExp(`^\\d+(\\.\\d{0,${decimalPlaces}})?$`);
        return regex.test(value) ? null : { 'invalidDecimal': true };
      }
      return null;
    };
  }

  onCantidadInput(event: any): void {
    const input = event.target.value;
    if (input) {
      const decimalIndex = input.indexOf('.');
      if (decimalIndex !== -1 && input.length - decimalIndex - 1 > 2) {
        event.target.value = input.substring(0, decimalIndex + 3);
      }
    }
  }

}
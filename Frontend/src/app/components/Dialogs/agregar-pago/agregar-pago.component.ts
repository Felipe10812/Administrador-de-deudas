import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Medio_Deuda_Prestamo } from '../../../interfaces/Dropdown';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DropdownService } from '../../../services/dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { PagosService } from '../../../services/pagos.service';
import { ErrorService } from '../../../services/error.service';
import { AgregarPago } from '../../../interfaces/Pagos';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-pago',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-pago.component.html',
  styleUrl: './agregar-pago.component.css'
})
export class AgregarPagoComponent implements OnInit {

  formRegistroPago: FormGroup;
  mediosPrestamoPagos: Medio_Deuda_Prestamo[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { IdUsuario: number },
    private dialogRef: MatDialogRef<AgregarPagoComponent>,
    private toastr: ToastrService,
    private _dropdownService: DropdownService,
    private pagosService: PagosService,
    private _errorService: ErrorService,
  ) {
    const fechaActual = new Date();
    const fechaFormateada = this.formatDate(fechaActual);

    this.formRegistroPago = new FormGroup({
      MedioPago: new FormControl('', Validators.required),
      FechaPago: new FormControl(fechaFormateada, Validators.required),  // Aquí inicializamos correctamente la fecha
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
          this.mediosPrestamoPagos = data[0];
        } else {
          this.toastr.error('Estructura de datos inesperada:', data);
        }
      },
      error: (error: any) => {
        this.toastr.error('Ocurrió un error', error);
      }
    });
  }

  get getMedioPago() {
    return this.formRegistroPago.get('MedioPago');
  }

  get getFechaPago() {
    return this.formRegistroPago.get('FechaPago');
  }

  get getCantidad() {
    return this.formRegistroPago.get('Cantidad');
  }

  get getMotivo() {
    return this.formRegistroPago.get('Motivo');
  }

  onSubmit() {
    if (this.formRegistroPago.valid) {
      this.addPago();
    } else {
      this.toastr.error('Formulario no válido');
    }
  }

  addPago() {
    const fechaRegistro = new Date(this.getFechaPago?.value); // Obtenemos la fecha seleccionada sin hora
    const pago: AgregarPago = {
      IdUsuario: this.data.IdUsuario,
      IdMedioPago: this.getMedioPago?.value,
      FechaRegistro: fechaRegistro,  // Aquí solo pasamos la fecha seleccionada sin hora
      Cantidad: parseFloat(this.getCantidad?.value),
      Motivo: this.getMotivo?.value
    };

    this.pagosService.postPago(pago).subscribe({
      next: () => {
        this.toastr.success('Pago agregado con éxito');
        this.dialogRef.close(pago);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    });
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

  // Método corregido para manejar correctamente la fecha en formato yyyy-MM-dd
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
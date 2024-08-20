import { Component, Inject } from '@angular/core';
import { deleteRegistro } from '../../../interfaces/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-eliminar-registro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './eliminar-registro.component.html',
  styleUrl: './eliminar-registro.component.css'
})
export class EliminarRegistroComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { IdUsuario: number, IdTransaccion: number, Tipo: string },
    private dialogRef: MatDialogRef<EliminarRegistroComponent>,
    private toastr: ToastrService,
    private _registroService: PagosService,
    private _errorService: ErrorService
  ) { }

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    const IdPago = this.data.Tipo === 'Deuda' ? this.data.IdTransaccion : this.data.IdTransaccion;

    const eliminarRegistro: deleteRegistro = {
      IdUsuario: this.data.IdUsuario,
      IdPago: IdPago,  // Usar la variable ajustada
      Tipo: this.data.Tipo,
    };

    this._registroService.deleteRegistro(eliminarRegistro).subscribe({
      next: () => {
        this.toastr.success('Registro eliminado con éxito');
        this.dialogRef.close(true);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    });
  }
}

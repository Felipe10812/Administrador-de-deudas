import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';
import { UserService } from '../../../services/user.service';
import { deleteUseario } from '../../../interfaces/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { IdUsuario: number },
    private dialogRef: MatDialogRef<EliminarComponent>,
    private toastr: ToastrService,
    private _usuarioService: UserService,
    private _errorService: ErrorService
  ) { }

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    const eliminarUsuario: deleteUseario = {
      IdUsuario: this.data.IdUsuario,
      esActivo: false
    };
    this._usuarioService.deleteUseario(eliminarUsuario).subscribe({
      next: () => {
        this.toastr.success('Usuario eliminado con éxito');
        this.dialogRef.close(true);

      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    })
  }
}

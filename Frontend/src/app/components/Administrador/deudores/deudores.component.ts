import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { DropUsuariosComponent } from '../../Elementos/drop-usuarios/drop-usuarios.component';
import { TablaDeudasUsuariosComponent } from "../../Elementos/tabla-deudas-usuarios/tabla-deudas-usuarios.component";
import { CommonModule } from '@angular/common';
import { Deudores } from '../../../interfaces/Deudas';
import { AgregarComponent } from '../../Dialogs/agregar/agregar.component';
import { DeudasService } from '../../../services/deudas.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AgregarPagoComponent } from '../../Dialogs/agregar-pago/agregar-pago.component';
import { Observer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deudores',
  standalone: true,
  imports: [
    RouterModule, NavbarComponent, DropUsuariosComponent, TablaDeudasUsuariosComponent,
    CommonModule, MatButtonModule
  ],
  templateUrl: './deudores.component.html',
  styleUrl: './deudores.component.css'
})

export default class DeudoresComponent {
  IdUsuario!: number;

  constructor(private _deudasService: DeudasService, private toastr: ToastrService, private dialog: MatDialog) { }
  dataSource = new MatTableDataSource<Deudores>();

  onUsuarioSeleccionado(id: number) {
    this.IdUsuario = id;
    this.getDeudas(); // Obtener las deudas cuando se selecciona un usuario
  }

  onAgregarDeuda() {
    let dialogRef = this.dialog.open(AgregarComponent, {
      height: 'auto',
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: { IdUsuario: this.IdUsuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        TablaDeudasUsuariosComponent // Recargar los datos después de cerrar el diálogo
      }
    });
  }

  onAgregarPago() {
    let dialogRef = this.dialog.open(AgregarPagoComponent, {
      height: 'auto',
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: { IdUsuario: this.IdUsuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        TablaDeudasUsuariosComponent; // Recargar los datos después de cerrar el diálogo
      }
    });
  }

  getDeudas() {
    if (!this.IdUsuario) {
      this.toastr.warning('Por favor seleccione un usuario primero.');
      return;
    }
    const observer: Observer<Deudores[]> = {
      next: (data: Deudores[]) => {
        this.dataSource.data = data;
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
          switch (sortHeaderId) {
            case 'Nombre':
              return data.Nombre.toLowerCase();
            case 'Cantidad':
              return data.Cantidad;
            default:
              return '';
          }
        };
      },
      error: (error: any) => {
        this.toastr.error('Error al obtener las deudas:', error);
      },
      complete: () => { }
    };
    this._deudasService.getDeudasPorUsuario(this.IdUsuario).subscribe();
  }
}

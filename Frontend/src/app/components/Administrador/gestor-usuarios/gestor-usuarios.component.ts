import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from '../../Dialogs/agregar-usuario/agregar-usuario.component';

@Component({
  selector: 'app-gestor-usuarios',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './gestor-usuarios.component.html',
  styleUrl: './gestor-usuarios.component.css'
})
export default class GestorUsuariosComponent {
  constructor(private toastr: ToastrService, private dialog: MatDialog) { }
  onAgregarDeuda() {
    let dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      height: 'auto',
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TablaDeudasUsuariosComponent // Recargar los datos después de cerrar el diálogo
      }
    });

  }
}

import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DeudasService } from '../../../services/deudas.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Deudas } from '../../../interfaces/Deudas';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EliminarRegistroComponent } from '../../Dialogs/eliminar-registro/eliminar-registro.component';

@Component({
  selector: 'app-tabla-deudas-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './tabla-deudas-usuarios.component.html',
  styleUrls: ['./tabla-deudas-usuarios.component.css']
})
export class TablaDeudasUsuariosComponent implements OnChanges {
  @Input() IdUsuario!: number;
  Deudas: MatTableDataSource<any> = new MatTableDataSource<any>();
  totalCantidad: number = 0; // Variable para el total de la columna Cantidad

  displayedColumns: string[] = ['Fecha', 'Cantidad', 'Comentarios', 'Tipo', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _deudasService: DeudasService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['IdUsuario'] && this.IdUsuario) {
      this.loadDeudas();
    }
  }

  loadDeudas() {
    this._deudasService.getDeudasPorUsuario(this.IdUsuario).subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item: any) => {
            const date = new Date(item.FechaRegistro);
            item.FechaRegistro = date.toISOString().split('T')[0];
          });

          this.Deudas.data = data;
          this.Deudas.paginator = this.paginator;
          this.Deudas.sort = this.sort;

          this.calculateTotal(); // Calcular el total después de cargar los datos
        } else {
          this.toastr.error('La estructura de los datos recibidos no es la esperada');
        }
      },
      error: (error: any) => {
        this.toastr.error('Error al obtener las deudas:', error);
      }
    });
  }

  calculateTotal() {
    const tipoDeuda = 'Deuda'; // Cambia esto según el tipo que estés manejando
    let total = 0;

    this.Deudas.filteredData.forEach(item => {
      if (item.Tipo === tipoDeuda) {
        total += item.Cantidad;
      }
    });

    // Si el tipo es 'deuda', resta los pagos (este ejemplo supone que los pagos están en la misma data)
    if (tipoDeuda === 'Deuda') {
      total -= this.Deudas.filteredData
        .filter(item => item.Tipo === 'Pago')
        .reduce((sum, item) => sum + item.Cantidad, 0);
    }
    this.totalCantidad = total;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Deudas.filter = filterValue.trim().toLowerCase();

    if (this.Deudas.paginator) {
      this.Deudas.paginator.firstPage();
    }
  }

  onEliminar(element: Deudas) {
    let dialogRef = this.dialog.open(EliminarRegistroComponent, {
      height: 'auto',
      width: '300px',
      data: element,
      panelClass: 'custom-dialog-container',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDeudas();
      }
    });
  }
}
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
/* Componentes de angular material*/
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { Deudas, Deudores } from '../../interfaces/Deudas';
import { Observer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgregarComponent } from '../Dialogs/agregar/agregar.component';
import { ToastrService } from 'ngx-toastr';
import { EliminarComponent } from '../Dialogs/eliminar/eliminar.component';
import { DeudasService } from '../../services/deudas.service';
import { AgregarPagoComponent } from '../Dialogs/agregar-pago/agregar-pago.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule, NavbarComponent, MatDialogModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule, MatTooltipModule, MatIconModule, MatFormFieldModule,
    SpinnerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export default class DashboardComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Nombre', 'Cantidad', 'Acciones'];
  dataSource = new MatTableDataSource<Deudores>();
  totalCantidad: number = 0;

  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _deudasServices: DeudasService,
    private http: HttpClient,
    private dialog: MatDialog,
    private toastr: ToastrService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getDeudas();
  }

  onAgregar(element: Deudas) {
    let dialogRef = this.dialog.open(AgregarComponent, {
      height: 'auto',
      width: '400px',
      data: element,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeudas(); // Recargar los datos después de cerrar el diálogo
      }
    });
  }

  onAgregarPago(element: Deudas) {
    let dialogRef = this.dialog.open(AgregarPagoComponent, {
      height: 'auto',
      width: '400px',
      data: element,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeudas(); // Recargar los datos después de cerrar el diálogo
      }
    });
  }

  getDeudas() {
    const observer: Observer<Deudores[]> = {
      next: (data: Deudores[]) => {
        if (data && data.length > 0 && Array.isArray(data)) {
          // Asegúrate de que `Cantidad` sea tratado como número
          const deudoresArray = data.map((item: Deudores) => ({
            ...item,
            Cantidad: Number(item.Cantidad)
          }));

          this.dataSource.data = deudoresArray;

          // Calcular el total de Cantidad
          this.totalCantidad = deudoresArray.reduce((total, element) => {
            return total + element.Cantidad;
          }, 0);

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
        } else {
          // Manejar el caso en que no haya valores en el JSON
          this.toastr.warning('No se encontraron deudas.');
          this.dataSource.data = []; // Dejar la tabla vacía
          this.totalCantidad = 0; // Establecer el total a 0
        }
      },
      error: (error: any) => {
        this.toastr.error(`Error al obtener las deudas: ${error}`);
      },
      complete: () => {
        // Lógica adicional cuando la operación se complete
      }
    };

    this._deudasServices.getDeudas().subscribe(observer);
  }


  onEliminar(element: Deudas) {
    let dialogRef = this.dialog.open(EliminarComponent, {
      height: 'auto',
      width: '300px',
      data: element,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeudas(); // Recargar los datos después de cerrar el diálogo
      }
    });
  }

  calculateTotal() {

  }

}
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
import { DeudasService } from '../../services/deudas.service';
import { HttpClient } from '@angular/common/http';
import { Deudas, Deudores } from '../../interfaces/Deudas';
import { Observer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgregarComponent } from '../Dialogs/agregar/agregar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule, NavbarComponent, MatFormFieldModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule, MatTooltipModule, MatIconModule, MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export default class DashboardComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Nombre', 'Cantidad', 'Acciones'];
  dataSource = new MatTableDataSource<Deudores>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _deudasServices: DeudasService, private http: HttpClient, private dialog: MatDialog) {

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.getDeudas();
  }

  onAgregar(element: Deudas) {
    let dialogRef = this.dialog.open(AgregarComponent, {
      height: '600px',
      width: '500px',
      data: element,
    });
  }

  getDeudas() {
    const observer: Observer<Deudores[]> = {
      next: (data: Deudores[]) => {
        const deudoresArray = data[0]; // Extraer el primer elemento que es el array de deudores
        if (Array.isArray(deudoresArray)) {
          this.dataSource.data = deudoresArray;
          console.log(this.dataSource.data);
        } else {
          console.error('La estructura de los datos recibidos no es la esperada:', data);
        }

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
        console.error('Error al obtener las deudas:', error);
      },
      complete: () => {
        console.log('Datos de deudas obtenidos con éxito');
      }
    };

    this._deudasServices.getDeudas().subscribe(observer);
  }

}

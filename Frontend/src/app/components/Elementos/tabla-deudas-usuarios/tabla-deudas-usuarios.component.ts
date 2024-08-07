import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DeudasService } from '../../../services/deudas.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-deudas-usuarios',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  templateUrl: './tabla-deudas-usuarios.component.html',
  styleUrl: './tabla-deudas-usuarios.component.css'
})
export class TablaDeudasUsuariosComponent implements OnChanges {
  @Input() IdUsuario!: number;
  Deudas: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['Fecha', 'Cantidad', 'Comentarios', 'Tipo', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _deudasService: DeudasService, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['IdUsuario'] && this.IdUsuario) {
      this.loadDeudas();
    }
  }

  loadDeudas() {
    this._deudasService.getDeudasPorUsuario(this.IdUsuario).subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.Deudas.data = data; // Asignar datos a MatTableDataSource
          this.Deudas.paginator = this.paginator; // Configurar paginador
          console.log(this.Deudas.data);
        } else {
          this.toastr.error('La estructura de los datos recibidos no es la esperada');
        }
      },
      error: (error: any) => {
        this.toastr.error('Error al obtener las deudas:', error);
      },
      complete: () => {
        this.toastr.success('Datos de deudas obtenidos con éxito');
        console.log('Datos de deudas obtenidos con éxito');
      }
    });
  }
}
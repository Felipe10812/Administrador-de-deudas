import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Drop_Usuarios } from '../../../interfaces/Dropdown';
import { DropdownService } from '../../../services/dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-drop-usuarios',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule],
  templateUrl: './drop-usuarios.component.html',
  styleUrl: './drop-usuarios.component.css'
})

export class DropUsuariosComponent implements OnInit {
  ListaUsuarios: Drop_Usuarios[] = [];
  @Output() usuarioSeleccionado = new EventEmitter<number>();

  constructor(
    private _dropdownService: DropdownService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getMediosPrestamoPagosPorUsuario();
  }

  getMediosPrestamoPagosPorUsuario() {
    this._dropdownService.getDropUsuarios().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.ListaUsuarios = data[0];
          console.log(this.ListaUsuarios);
          this.toastr.info('Estructura de datos cargada con éxito.');
        } else {
          this.toastr.error('Estructura de datos inesperada:', data);
        }
      },
      error: (error: any) => {
        this.toastr.error('Ocurrió un error', error);
      },
      complete: () => {
        this.toastr.success('Dropdown cargado con éxito');
      }
    });
  }

  onUsuarioChange(event: MatSelectChange) {
    const IdUsuario = event.value;
    this.usuarioSeleccionado.emit(IdUsuario);
  }
}
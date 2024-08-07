import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { DropUsuariosComponent } from '../../Elementos/drop-usuarios/drop-usuarios.component';
import { TablaDeudasUsuariosComponent } from "../../Elementos/tabla-deudas-usuarios/tabla-deudas-usuarios.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deudores',
  standalone: true,
  imports: [RouterModule, NavbarComponent, DropUsuariosComponent, TablaDeudasUsuariosComponent, CommonModule],
  templateUrl: './deudores.component.html',
  styleUrl: './deudores.component.css'
})
export default class DeudoresComponent {
  IdUsuario!: number;

  onUsuarioSeleccionado(id: number) {
    this.IdUsuario = id;
  }

}

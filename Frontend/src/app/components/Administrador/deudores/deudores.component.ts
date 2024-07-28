import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-deudores',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './deudores.component.html',
  styleUrl: './deudores.component.css'
})
export default class DeudoresComponent {

}

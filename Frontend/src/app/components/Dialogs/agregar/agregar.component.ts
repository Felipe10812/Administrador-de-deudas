import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarDeuda } from '../../../interfaces/Deudas';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownService } from '../../../services/dropdown.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})

export class AgregarComponent implements OnInit {

  agregarDeuda!: AgregarDeuda;
  formRegistroDeuda: FormGroup;
  mediosPrestamo: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AgregarDeuda,
    private dropdownService: DropdownService
  ) {
    this.agregarDeuda = data;
    this.formRegistroDeuda = new FormGroup({
      MedioPrestamo: new FormControl('', Validators.required),
      // otros campos aquí
    });
  }

  ngOnInit(): void {
    this.loadMediosPrestamo();
  }

  loadMediosPrestamo(): void {
    this.dropdownService.getMediosPrestamo().subscribe(data => {
      this.mediosPrestamo = data;
    });
  }

  get getMedioPrestamo() {
    return this.formRegistroDeuda.get('MedioPrestamo');
  }
}
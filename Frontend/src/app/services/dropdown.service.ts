import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drop_Usuarios, Medio_Deuda_Prestamo, Roles } from '../interfaces/Dropdown';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private MyAppUrl: string;
  private MyApi: string;
  private MyApiMediosDePago: string;
  private MyApiUsuarios: string;
  private MyRol: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApi = 'api/';
    this.MyApiMediosDePago = 'MediosPrestamo';
    this.MyApiUsuarios = 'DropUsuarios';
    this.MyRol = 'Rol'
  }

  getMediosPrestamo(): Observable<Medio_Deuda_Prestamo[]> {
    return this.http.get<Medio_Deuda_Prestamo[]>(`${this.MyAppUrl}${this.MyApi}${this.MyApiMediosDePago}`);
  }

  getDropUsuarios(): Observable<Drop_Usuarios[]> {
    return this.http.get<Drop_Usuarios[]>(`${this.MyAppUrl}${this.MyApi}${this.MyApiUsuarios}`);
  }

  getDropRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.MyAppUrl}${this.MyApi}${this.MyRol}`);
  }
}

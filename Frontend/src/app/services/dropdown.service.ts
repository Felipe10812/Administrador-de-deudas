import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medio_Deuda_Prestamo } from '../interfaces/Dropdown';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/MediosPrestamo';
  }

  getMediosPrestamo(): Observable<Medio_Deuda_Prestamo[]> {
    return this.http.get<Medio_Deuda_Prestamo[]>(`${this.MyAppUrl}${this.MyApiUrl}`);
  }
}

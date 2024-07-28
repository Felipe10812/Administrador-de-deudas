import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AgregarPago } from '../interfaces/Pagos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/Pagos';
  }

  postPago(pago: AgregarPago): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}`, pago)
  }
}

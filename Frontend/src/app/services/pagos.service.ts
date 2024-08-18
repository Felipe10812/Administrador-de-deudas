import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AgregarPago } from '../interfaces/Pagos';
import { Observable } from 'rxjs';
import { deleteRegistro } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private MyAppUrl: string;
  private MyApi: string;
  private MyPago: string;
  private MyRegistro: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApi = 'api/';
    this.MyPago = 'Pagos';
    this.MyRegistro = 'Registro';
  }

  postPago(pago: AgregarPago): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApi}${this.MyPago}`, pago)
  }

  deleteRegistro(registro: deleteRegistro): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApi}${this.MyRegistro}`, registro)
  }
}

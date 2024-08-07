import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AgregarDeuda, Deudas, Deudor, Deudores } from '../interfaces/Deudas';

@Injectable({
  providedIn: 'root'
})
export class DeudasService {
  private MyAppUrl: string;
  private MyApi: string;
  private MyDeuda: string;
  private MyUsers: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApi = 'api/';
    this.MyDeuda = 'Deudas';
    this.MyUsers = 'Deudores';
  }


  getDeudas(): Observable<Deudores[]> {
    return this.http.get<Deudores[]>(`${this.MyAppUrl}${this.MyApi}${this.MyDeuda}`)
  }

  getDeudasPorUsuario(IdUsuario: number): Observable<Deudor[]> {
    const params = new HttpParams().set('IdUsuario', IdUsuario.toString());
    return this.http.get<Deudor[]>(`${this.MyAppUrl}${this.MyApi}${this.MyUsers}`, { params });
  }

  postDeuda(deuda: AgregarDeuda): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApi}${this.MyDeuda}`, deuda)
  }
}

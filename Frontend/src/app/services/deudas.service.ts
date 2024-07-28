import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AgregarDeuda, Deudores } from '../interfaces/Deudas';

@Injectable({
  providedIn: 'root'
})
export class DeudasService {
  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/Deudas';
  }

  getDeudas(): Observable<Deudores[]> {
    return this.http.get<Deudores[]>(`${this.MyAppUrl}${this.MyApiUrl}`)
  }

  postDeuda(deuda: AgregarDeuda): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}`, deuda)
  }
}

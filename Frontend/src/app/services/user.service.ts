import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/users/';
  }
  sigIn(user: Usuario): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}`, user)
  }
}

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = `${environment.API_URL}/auth`

  constructor(
    private readonly httpService: HttpClient,
  ) { }

  public logIn(username: string, password: string): Observable<any> {
    return this.httpService.post(`${this.API_URL}/login`, {
      username,
      password,
    });
  }
}

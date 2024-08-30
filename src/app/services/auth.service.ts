import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = `${environment.API_URL}/auth`

  constructor(
    private readonly httpService: HttpClient,
  ) { }

  public logIn(username: string, password: string): Observable<{token: string}> {
    return this.httpService.post<{token: string}>(`${this.API_URL}/login`, {
      username,
      password,
    }).pipe(
      tap((response) => this.saveToken(response.token)),
    );
  }

  public saveToken(token: string): void {
    localStorage.setItem('payments-token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('payments-token');
  }
}

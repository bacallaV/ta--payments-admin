import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { ISortFilters } from '../utils/interfaces/sort-filters.interface';
import { IPayment } from '../utils/interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private readonly API_URL = `${environment.API_URL}/payments`

  constructor(
    private readonly httpService: HttpClient,
  ) { }

  public getAllPayments(sortFilters?: ISortFilters): Observable<{data: IPayment[]}> {
    return this.httpService.get<{data: IPayment[]}>(`${this.API_URL}`, {
      params: { ...sortFilters },
    });
  }

  public createPayment(data: IPayment): Observable<IPayment> {
    return this.httpService.post<IPayment>(`${this.API_URL}`, data);
  }
}

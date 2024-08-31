import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { ICreateCustomerDto, ICustomer, IEditCustomerDto } from '../utils/interfaces/customers.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly API_URL = `${environment.API_URL}/customers`;

  constructor(
    private readonly httpService: HttpClient,
  ) { }

  public getAll(name?: string): Observable<{data: ICustomer[]}> {
    return this.httpService.get<{data: ICustomer[]}>(`${this.API_URL}`, {
      params: name ? { query: name } : undefined,
    });
  }

  public create(customer: ICreateCustomerDto): Observable<ICustomer> {
    return this.httpService.post<ICustomer>(`${this.API_URL}`, customer);
  }

  public patch(customer: IEditCustomerDto): Observable<ICustomer> {
    return this.httpService.patch<ICustomer>(`${this.API_URL}`, customer);
  }

  public delete(customer: ICustomer): Observable<void> {
    return this.httpService.delete<void>(`${this.API_URL}/${customer.id}`);
  }
}

import { Component } from '@angular/core';
// Angular material
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CustomerFormComponent, CustomersTableComponent } from '../../components';

import { CustomersService } from '../../services/customers.service';
import { ICustomer } from '../../utils/interfaces/customers.interface';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    CustomersTableComponent,
  ],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.scss'
})
export class CustomerPageComponent {
  public customers: ICustomer[];
  public name: FormControl;

  constructor(
    private readonly customerService: CustomersService,
    private readonly dialog: MatDialog,
  ) {
    this.customers = [];

    this.name = new FormControl('');

    this.fetchAllCustomers();
    this.reactToNameChanges();
  }

  private fetchAllCustomers(name?: string): void {
    this.customerService.getAll(name).subscribe({
      next: (response) => {
        this.customers = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private reactToNameChanges(): void {
    this.name.valueChanges
      .pipe(
        debounceTime(500),
      ).subscribe({
        next: (nameValue) => this.fetchAllCustomers(nameValue),
      });
  }

  public openCustomerForm(payment?: any): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '90vw',
      height: '80vh',
      data: payment,
    });

    dialogRef.afterClosed().subscribe((data?: ICustomer) => {
      console.log('hey');
      if (!data) return;

      // this.addPayment(data);
    });
  }

  public deleteCustomer(customer: ICustomer): void {
    this.customerService.delete(customer).subscribe({
      next: () => {
        this.customers = this.customers.filter(
          c => c.id !== customer.id,
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

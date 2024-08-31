import { Component } from '@angular/core';
// Angular material
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { PaymentsTableComponent, PaymentFormComponent } from '../../components';
import { IPayment } from '../../utils/interfaces/payment.interface';
import { PaymentsService } from '../../services/payments.service';
import { ISortFilters } from '../../utils/interfaces/sort-filters.interface';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [PaymentsTableComponent, MatButtonModule],
  templateUrl: './payments-page.component.html',
  styleUrl: './payments-page.component.scss'
})
export class PaymentsPageComponent {
  public payments: IPayment[];

  constructor(
    private readonly dialog: MatDialog,
    private readonly paymentsService: PaymentsService,
  ) {
    this.payments = [];

    this.fetchPayments();
  }

  public fetchPayments(sortFilers?: ISortFilters): void {
    this.paymentsService.getAllPayments(sortFilers).subscribe({
      next: (res) => {
        this.payments = res.data;
      },
      error: (res) => {
        console.error(res);
      },
    });
  }

  public openPaymentForm(payment?: any): void {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '90vw',
      height: '80vh',
      data: payment,
    });

    dialogRef.afterClosed().subscribe((data?: IPayment) => {
      if (!data) return;

      this.addPayment(data);
    });
  }

  private addPayment(payment: IPayment): void {
    this.paymentsService.createPayment(payment).subscribe({
      next: (p) => {
        this.payments = [...this.payments, p];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public deletePayment(payment: IPayment): void {
    console.log('delete', payment);
  }
}

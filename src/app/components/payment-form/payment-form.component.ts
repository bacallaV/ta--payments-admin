import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomersService } from '../../services/customers.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent implements OnInit {
  public form: FormGroup;

  public isLoading: boolean = false;

  public customersOptions: {
    value: string,
    name: string,
  }[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: CustomersService,
    private readonly dialogRef: MatDialogRef<PaymentFormComponent>,
  ) {
    this.form = this.formBuilder.group({
      customerId: [null, Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      concept: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchOptions();
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  private fetchOptions(): void {
    this.customersService.getAll().subscribe({
      next: (response) => {
        this.customersOptions = response.data.map(
          customer => ({ value: customer.id, name: customer.name })
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

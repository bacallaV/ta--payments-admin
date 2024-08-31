import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// Own imports
import { CustomersService } from '../../services/customers.service';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { ICustomer } from '../../utils/interfaces/customers.interface';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  public form: FormGroup;

  private isEditMode: boolean;

  public customersOptions: {
    value: string,
    name: string,
  }[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: CustomersService,
    private readonly dialogRef: MatDialogRef<PaymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: ICustomer,
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, [Validators.required]],
      dateOfBirth: [null, Validators.required],
    });

    if (data) {
      this.isEditMode = true;
      this.form.patchValue(data);
    } else {
      this.isEditMode = false;
    }
  }

  ngOnInit(): void {
    this.fetchOptions();
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      mode: this.isEditMode ? 'edit' : 'create',
      data: this.form.value,
    });
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

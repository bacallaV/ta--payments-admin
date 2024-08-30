import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  public form: FormGroup;

  public status: 'initial' | 'loading' | 'success' | 'error' = 'initial';
  public errorMsg: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public logIn(): void {
    this.errorMsg = '';
    this.status = 'initial';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMsg = 'Formulario incompleto';
      this.status = 'error';
      return;
    }

    this.status = 'loading';
    this.authService.logIn(this.username.value, this.password.value).subscribe({
      next: (res) => {
        this.status = 'success';
        this.router.navigate(['/admin']);
      },
      error: (err: HttpErrorResponse) => {
        this.status = 'error';
        this.errorMsg = err.error.message;
      },
    });
  }

  public get username(): FormControl {
    return this.form.controls['username'] as FormControl;
  }

  public get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }
}

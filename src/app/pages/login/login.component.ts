import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule, NzFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  validateForm = this.fb.group({
    username: this.fb.control('emilys', [Validators.required]),
    password: this.fb.control('emilyspass', [Validators.required]),
    remember: this.fb.control(true)
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.getRawValue().username, this.validateForm.getRawValue().password)

      const username = this.validateForm.getRawValue().username
      const password = this.validateForm.getRawValue().password

      this.authService.login(username, password).subscribe({
        next: (console.log),
        error: err => alert('Login failed: ' + err.message)
      });
    }
    else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'] 
})
export class LoginPage {
  authService = inject(Auth);
  router = inject(Router);
  errorLogin = false;

  async login(form: NgForm) {
    this.errorLogin = false;

    if (form.invalid) {
      this.errorLogin = true;
      return;
    }

    const ok = await this.authService.login(form.value);
    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.errorLogin = true;
    }
  }
}

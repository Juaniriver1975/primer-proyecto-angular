import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
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
      return;
    }

    const ok = await this.authService.login(form.value);

    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.errorLogin = true;
      Swal.fire({
        icon: 'error',
        title: 'Error de Autenticación',
        text: 'El correo electrónico o la contraseña son incorrectos. Por favor, intente de nuevo.',
        background: '#1a1b21', 
        color: '#e5e7eb',      
        confirmButtonColor: '#3b82f6'
      });
    }
  }
}
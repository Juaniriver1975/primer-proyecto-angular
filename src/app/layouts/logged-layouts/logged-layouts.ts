import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logged-layout',
  standalone: true, // Agregado para versiones modernas de Angular
  imports: [RouterOutlet, RouterModule],
  templateUrl: './logged-layouts.html',
  styleUrl: './logged-layouts.scss'
})
export class LoggedLayout {
  authService = inject(Auth);

  logout() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Serás redirigido a la página de inicio de sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí se llama a la función de logout del servicio
        this.authService.logout();

        Swal.fire(
          "¡Sesión cerrada!",
          "Has cerrado sesión exitosamente.",
          "success"
        );
      }
    });
  }
}

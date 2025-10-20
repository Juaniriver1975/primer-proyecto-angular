import { Component, inject, input, output } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-services';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list-item',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  index = input.required<number>();
  contacto = input.required<Contact>();
  
  contactsService = inject(ContactsService);
  
  onDelete = output<number>(); 

  async deleteContact() {

    const result = await Swal.fire({
      title: '¿Estás seguro que queres eliminar un contacto?',
      text: "¡No podrás revertir esto despues !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const deleted = await this.contactsService.deleteContact(this.contacto().id);
      
      if (deleted) {
        this.onDelete.emit(this.contacto().id); 
        Swal.fire(
          '¡Eliminado!',
          'El contacto ha sido eliminado.',
          'success'
        );
      } else {
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el contacto.',
          'error'
        );
      }
    }
  }
}
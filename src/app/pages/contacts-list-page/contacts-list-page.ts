import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Auth } from '../../services/auth';
import { ContactsService } from '../../services/contacts-services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list-page',
  imports: [RouterModule,ContactListItem, FormsModule],
  templateUrl: './contacts-list-page.html',
  styleUrl: './contacts-list-page.scss'
})
export class ContactListPage implements OnInit {
  ngOnInit(): void {
    // Agregamos `true` para forzar la recarga de los contactos cada vez que se carga la página
    this.contactsService.getAllContacts(true); 
  }

  authService = inject(Auth)
  contactsService = inject(ContactsService)

  handleContactDeleted(deletedContactId: number) {
    // La eliminación ya se maneja en el servicio, solo refrescamos la vista si es necesario
    // Para asegurar que la lista se actualice
    // this.contactsService.getAllContacts(true);
    console.log(`Contacto con ID ${deletedContactId} eliminado.`);
  }
}
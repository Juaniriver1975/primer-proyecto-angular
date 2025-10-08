import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts-services';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contacto';

@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contacts-details-page.html',
  styleUrl: './contacts-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  id = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  cargandoEliminar = false; // Nueva variable de estado para el botón de eliminar
  errorEliminar = false; // Nueva variable de estado para los errores de eliminación
  router = inject(Router);

  async ngOnInit() {
    if(this.id()){
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.id());
      this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.id());
      if(res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite(){
    if(this.contacto){
      const updatedContact = await this.contactService.setFavorite(this.contacto.id);
      if(updatedContact) this.contacto = updatedContact;
    }
  }

  async deleteContact(){
    if(this.contacto){
      try {
        this.cargandoEliminar = true; // Inicia el estado de carga
        const res = await this.contactService.deleteContact(this.contacto.id);
        if(res) {
          this.router.navigate(['/']); // Redirecciona si la eliminación fue exitosa
        } else {
          this.errorEliminar = true; // Muestra un error si la respuesta no es OK
        }
      } catch (error) {
        this.errorEliminar = true; // Muestra un error si ocurre una excepción
      } finally {
        this.cargandoEliminar = false; // Finaliza el estado de carga
      }
    }
  }
}
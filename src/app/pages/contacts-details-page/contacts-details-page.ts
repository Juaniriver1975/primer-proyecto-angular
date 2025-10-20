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
      if (await this.contactService.setFavorite(this.contacto.id)) {
        this.contacto.isFavorite = !this.contacto.isFavorite;
      }
    }
  }

  async deleteContact(){
    if(this.contacto){
      try {
        this.cargandoEliminar = true; 
        const res = await this.contactService.deleteContact(this.contacto.id);
        if(res) {
          this.router.navigate(['/']); 
        } else {
          this.errorEliminar = true; 
        }
      } catch (error) {
        this.errorEliminar = true; 
      } finally {
        this.cargandoEliminar = false; 
      }
    }
  }
}
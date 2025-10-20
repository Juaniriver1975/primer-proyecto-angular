import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts-services';
import { Router } from '@angular/router';
import { Contact, NewContact } from '../../interfaces/contacto';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  id = input<string>();
  contactoBack:Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm")

  async ngOnInit() {
    if(this.id()){
      const contacto:Contact|null = await this.contactsService.getContactById(this.id()!);
      if(contacto){
        this.contactoBack = contacto;

        setTimeout(() => {
          this.form()?.setValue({
            address: contacto.address,
            company: contacto.company,
            email: contacto.email,
            firstName:contacto.firstName,
            image:contacto.image,
            isFavorite:contacto.isFavorite,
            lastName: contacto.lastName,
            number: contacto.number
          });
        });
      }
    }
  }

  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
    const { isFavorite, ...contactData } = form.value;

    let res;
    if(this.id()){
      res = await this.contactsService.editContact({...contactData,id:this.contactoBack!.id});
    } else {
      res = await this.contactsService.createContact(contactData);
    }

    if(!res) {
      this.errorEnBack = true;
      return
    };

    if (this.id()) {
      if (isFavorite !== this.contactoBack!.isFavorite) {
        await this.contactsService.setFavorite(res.id);
      }
      this.router.navigate(['/contacts', res.id]);
    } else {
      if (isFavorite) {
        await this.contactsService.setFavorite(res.id);
      }
      this.router.navigate(['/']);
    }
  }
}
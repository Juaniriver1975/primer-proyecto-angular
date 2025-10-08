import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(Auth);
  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  /** Lista de contactos en memoria */
  contacts: Contact[] = [];

  /**
   * Obtiene todos los contactos del backend. 
   * @param forceRefresh Fuerza la recarga desde la API, ignorando la caché.
   */
  async getAllContacts(forceRefresh = false): Promise<Contact[]> {
    // Si la lista está vacía O se pide forzar la recarga, vamos a la API.
    if (this.contacts.length === 0 || forceRefresh) {
      try {
        const res = await fetch(this.URL_BASE, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.authService.token
          }
        });

        if (res.ok) {
          this.contacts = await res.json();
        } else {
          console.error("Error al cargar los contactos:", res.status, res.statusText);
          this.contacts = [];
        }
      } catch (error) {
        console.error("Error de red al cargar contactos:", error);
        this.contacts = [];
      }
    }
    return this.contacts;
  }

  /**
   * Obtiene un contacto por ID. Prioriza la caché local.
   */
  async getContactById(id:string | number){
    const res = await fetch(this.URL_BASE+"/"+id,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer "+this.authService.token
        }
      })
      if(res.ok){
        const resJson:Contact = await res.json()
        return resJson;
      }
      return null;
  }

  /** Crea un contacto */
  async createContact(nuevoContacto: NewContact): Promise<Contact | null> {
    try {
      const res = await fetch(this.URL_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(nuevoContacto)
      });

      if (!res.ok) {
        console.error("Error en la API al crear contacto:", res.status, res.statusText);
        return null;
      }
      const resContact: Contact = await res.json();
      
      // Actualizamos la caché local con el nuevo contacto
      this.contacts.push(resContact);
      return resContact;
    } catch (error) {
      console.error("Error de red al crear contacto:", error);
      return null;
    }
  }

  /** Elimina un contacto segun su ID */
  async deleteContact(id:number){
    const res = await fetch(this.URL_BASE+"/"+id, 
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    return true;
  }

  async editContact(contact:Contact){
    const res = await fetch(this.URL_BASE+"/"+contact.id, 
      {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(contact)
      });
    if(!res.ok) return;
    /** Actualizo la lista de leads locales para dejar el lead que actualice actualizado */
    this.contacts = this.contacts.map(oldContact =>{
      if(oldContact.id === contact.id) return contact;
      return oldContact
    })
    return contact;
  }

  /** Marca/desmarca un contacto como favorito */
  async setFavorite(id:string | number ) {
    const res = await fetch(this.URL_BASE+"/"+id+"/favorite", 
      {
        method: "POST",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    const updatedContact = await res.json();//crea la constante updatedContact que contiene el contacto actualizado
    /** Edita la lista actual de contactos reemplazando sólamente el favorito del que editamos */
    this.contacts = this.contacts.map(contact => {
      if(contact.id === id) {
        return updatedContact; 
      };
      return contact;
    });
    return updatedContact;
  }
}

import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactListPage } from './pages/contacts-list-page/contacts-list-page';
import { ContactDetailsPage } from './pages/contacts-details-page/contacts-details-page';
import { LoggedLayout } from './layouts/logged-layouts/logged-layouts';
import { RegisterPage } from './pages/register/register';
import { onlyPublicGuard } from './guards/only-public-guard-guard';
import { onlyUserGuard } from './guards/only-user-guard-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';
import { PublicLayout } from './layouts/logged-layouts/public-layout/public-layout';
export const routes: Routes = [
  
    {
        path: '',
        component: PublicLayout,
        canActivate: [onlyPublicGuard], 
        children: [
            { path: 'login', component: LoginPage },
            { path: 'register', component: RegisterPage },
        ]
    },
   
    {
        path: 'contacts', 
        component: LoggedLayout,
        canActivate: [onlyUserGuard], 
        children: [
            {
                path: '', 
                component: ContactListPage
            }, {
                path: 'new',
                component: NewEditContact
            }, {
                path: ':id/edit',
                component: NewEditContact
            },
            {
                path: ':id',
                component: ContactDetailsPage
            },
        ]
    },
    
    {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full'
    }
];
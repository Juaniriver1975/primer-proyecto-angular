import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactListPage } from './pages/contacts-list-page/contacts-list-page';
import { ContactDetailsPage } from './pages/contacts-details-page/contacts-details-page';
import { LoggedLayout } from './layouts/logged-layouts/logged-layouts';
import { RegisterPage } from './pages/register/register';
import { onlyPublicGuard } from './guards/only-public-guard-guard';
import { onlyUserGuard } from './guards/only-user-guard-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';

export const routes: Routes = [
    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "",
        component: LoggedLayout,
        canActivateChild: [onlyUserGuard],
        children: [
            {
                path: "", 
                component: ContactListPage
            }, {
                path: "contacts/new",
                component: NewEditContact
            }, {
                path: "contacts/:id/edit",
                component: NewEditContact
            },
            {
                path: "contacts/:id",
                component: ContactDetailsPage
            },
        ]
    },
];
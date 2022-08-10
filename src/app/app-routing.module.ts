import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {AuthGuard} from 'src/app/guards/auth.guard'
//compoents
import { GetUsersComponent } from './componets/get-users/get-users.component';
import { AddUsersComponent } from './componets/add-users/add-users.component';
import { GetContactComponent } from './componets/get-contact/get-contact.component';
import {AddContactComponent} from './componets/add-contact/add-contact.component';
import {HomeComponent}  from '../app/componets/home/home.component';
import { CardComponent } from './componets/card/card.component';
import{LoginComponent} from './componets/login/login.component'

const routes: Routes = [
{path : 'admin/contact',component : GetContactComponent,canActivate:[AuthGuard]},
{path : 'admin/users' ,component: GetUsersComponent,canActivate:[AuthGuard]},
{path : '',component : HomeComponent},
{path : 'card/:nameuser', component: CardComponent},
{path : 'inicio',component : LoginComponent},
{path : 'admin/create-user',component: AddUsersComponent,canActivate:[AuthGuard]},
{path : 'admin/update-user/:id',component: AddUsersComponent,canActivate:[AuthGuard]},
{path : 'admin/create-contact', component: AddContactComponent,canActivate:[AuthGuard]},
{path : 'admin/update-contact/:id', component: AddContactComponent,canActivate:[AuthGuard]},




];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

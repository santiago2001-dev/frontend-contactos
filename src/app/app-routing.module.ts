import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//compoents
import { GetUsersComponent } from './componets/get-users/get-users.component';
import { AddUsersComponent } from './componets/add-users/add-users.component';
import { GetContactComponent } from './componets/get-contact/get-contact.component';
import {AddContactComponent} from './componets/add-contact/add-contact.component'

const routes: Routes = [
{path : 'contact',component : GetContactComponent},
{path : 'users' ,component: GetUsersComponent},
{path : 'admin',component : GetUsersComponent},
{path : 'admin/create-user',component: AddUsersComponent},
{path : 'admin/update-user/:id',component: AddUsersComponent},
{path : 'admin/create-contact', component: AddContactComponent},
{path : 'admin/update-contact/:id', component: AddContactComponent},


{path : '**',redirectTo : '',pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

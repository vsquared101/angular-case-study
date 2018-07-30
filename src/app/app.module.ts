import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SsnFormatPipe } from './ssn-format.pipe';

const appRoutes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'users/:id/view',
    component: ViewUserComponent
  },
  {
    path: 'users/:id/edit',
    component: EditUserComponent
  },
  {
    path: 'users/new',
    component: CreateUserComponent
  },
  {
    path: '**',
    component: UserListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ViewUserComponent,
    EditUserComponent,
    CreateUserComponent,
    UserListComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    SsnFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

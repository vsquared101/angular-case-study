import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TrusteeService } from './trustee.service';
import { ViewTrusteeComponent } from './view-trustee/view-trustee.component';
import { EditTrusteeComponent } from './edit-trustee/edit-trustee.component';
import { CreateTrusteeComponent } from './create-trustee/create-trustee.component';
import { TrusteeListComponent } from './trustee-list/trustee-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TrusteeListComponent
  },
  {
    path: 'trustees/:id/view',
    component: ViewTrusteeComponent
  },
  {
    path: 'trustees/:id/edit',
    component: EditTrusteeComponent
  },
  {
    path: 'trustees/new',
    component: CreateTrusteeComponent
  },
  {
    path: '**',
    component: TrusteeListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ViewTrusteeComponent,
    EditTrusteeComponent,
    CreateTrusteeComponent,
    TrusteeListComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TrusteeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

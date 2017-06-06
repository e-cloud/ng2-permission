import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PermissionModule } from '../permission/permission.module';
import { DefinePermissionsAndRolesService } from './define-permissions-and-roles.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PermissionModule.forRoot()
  ],
  providers: [
      DefinePermissionsAndRolesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

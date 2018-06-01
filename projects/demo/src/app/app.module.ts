import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PermissionModule } from 'ng2-permission';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

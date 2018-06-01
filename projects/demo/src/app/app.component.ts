import { Component } from '@angular/core';
import { DefinePermissionsAndRolesService } from './define-permissions-and-roles.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';
    readable = false;
    permissionList = ['Read', 'Write', 'Delete']

    constructor(private defineService: DefinePermissionsAndRolesService) {
        this.defineService.init();
    }

    toggleReadPermission($event: Event) {
        console.log($event)
        this.defineService.enableRead(!this.readable)
        this.readable = !this.readable
    }
}

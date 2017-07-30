import { Component } from '@angular/core';
import { DefinePermissionsAndRolesService } from './define-permissions-and-roles.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';

    constructor(private defineService: DefinePermissionsAndRolesService) {
        this.defineService.init();
    }
}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { Authorization } from './Authorization/Authorization';
import { PermissionIfDirective } from './directives/permissionIf.directive';
import { PermissionPipe } from './pipes/permission.pipe';
import { PermissionStore } from './stores/PermissionStore';
import { RoleStore } from './stores/RoleStore';

import './rxjs-extension';

@NgModule({
    imports: [],
    declarations: [
        PermissionIfDirective,
        PermissionPipe,
    ],
    exports: [
        PermissionIfDirective,
        PermissionPipe,
    ]
})
export class PermissionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PermissionModule,
            providers: [
                Authorization,
                PermissionStore,
                RoleStore,
            ]
        };
    }
}

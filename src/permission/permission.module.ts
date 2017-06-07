import { ModuleWithProviders, NgModule } from '@angular/core';
import { Authorization } from './Authorization/Authorization';
import { PermissionIfDirective } from './directives/permissionIf.directive';
import { PermissionStore } from './stores/PermissionStore';
import { RoleStore } from './stores/RoleStore';

import './rxjs-extension'

@NgModule({
    imports: [],
    declarations: [
        PermissionIfDirective,
    ],
    exports: [
        PermissionIfDirective,
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

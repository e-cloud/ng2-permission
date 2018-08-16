import { ModuleWithProviders, NgModule } from '@angular/core';

import { Authorization } from './Authorization/Authorization';
import { PermissionAnyOfDirective } from './directives/permissionAnyOf.directive';
import { PermissionExceptDirective } from './directives/permissionExcept.directive';
import { PermissionIfDirective } from './directives/permissionIf.directive';
import { PermissionOnlyDirective } from './directives/permissionOnly.directive';
import { PermissionPipe } from './pipes/permission.pipe';
import { PermissionGuard } from './services/permission-guard.service';
import { PermissionStore } from './stores/PermissionStore';
import { RoleStore } from './stores/RoleStore';

@NgModule({
    imports: [],
    declarations: [
        PermissionIfDirective,
        PermissionOnlyDirective,
        PermissionExceptDirective,
        PermissionAnyOfDirective,
        PermissionPipe,
    ],
    exports: [
        PermissionIfDirective,
        PermissionOnlyDirective,
        PermissionExceptDirective,
        PermissionAnyOfDirective,
        PermissionPipe,
    ],
})
export class PermissionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PermissionModule,
            providers: [
                PermissionGuard,
                Authorization,
                PermissionStore,
                RoleStore,
            ],
        };
    }
}

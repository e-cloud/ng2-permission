import { ModuleWithProviders, NgModule } from '@angular/core';

import { AUTHORIZATION_PROVIDER } from './Authorization/Authorization';
import { PermissionAnyOfDirective } from './directives/permissionAnyOf.directive';
import { PermissionExceptDirective } from './directives/permissionExcept.directive';
import { PermissionIfDirective } from './directives/permissionIf.directive';
import { PermissionOnlyDirective } from './directives/permissionOnly.directive';
import { PermissionPipe } from './pipes/permission.pipe';
import { PermissionGuard } from './services/permission-guard.service';
import { PERMISSIONSTORE_PROVIDER } from './stores/PermissionStore';
import { ROLESTORE_PROVIDER } from './stores/RoleStore';

@NgModule({
    imports: [],
    declarations: [
        PermissionIfDirective,
        PermissionOnlyDirective,
        PermissionExceptDirective,
        PermissionAnyOfDirective,
        PermissionPipe,
    ],
    providers: [
        PermissionGuard,
        AUTHORIZATION_PROVIDER,
        PERMISSIONSTORE_PROVIDER,
        ROLESTORE_PROVIDER,
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
    /**
     * @deprecated use PermissionModule directly
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PermissionModule,
        };
    }
}

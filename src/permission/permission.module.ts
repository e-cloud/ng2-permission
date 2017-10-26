import { ModuleWithProviders, NgModule } from '@angular/core';
import { Authorization } from './Authorization/Authorization';
import { PermissionIfDirective } from './directives/permissionIf.directive';
import { PermissionPipe } from './pipes/permission.pipe';
import { PermissionGuard } from './services/permission-guard.service';
import { PermissionStore } from './stores/PermissionStore';
import { RoleStore } from './stores/RoleStore';

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
                PermissionGuard,
                Authorization,
                PermissionStore,
                RoleStore,
            ]
        };
    }
}

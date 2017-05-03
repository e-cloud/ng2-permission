import { ModuleWithProviders, NgModule } from '@angular/core'
import RoleStore from './stores/RoleStore'
import PermissionStore from './stores/PermissionStore'
import { PermissionIfDirective } from './directives/permissionIf.directive'
import Authorization from './Authorization/Authorization'

@NgModule({
    imports: [
    ],
    declarations: [
        PermissionIfDirective
    ],
    exports: [
        PermissionIfDirective
    ]
})
export class PermissionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PermissionModule,
            providers: [
                Authorization,
                PermissionStore,
                RoleStore
            ]
        };
    }
}

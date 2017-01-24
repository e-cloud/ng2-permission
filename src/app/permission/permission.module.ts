import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import RoleStore from './stores/RoleStore'
import PermissionStore from './stores/PermissionStore'
import { PermissionIfDirective } from './directive/permissionIf.directive'
import Authorization from './Authorization/Authorization'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PermissionIfDirective
    ],
    providers: [
        Authorization,
        PermissionStore,
        RoleStore
    ],
    exports: [
        PermissionIfDirective
    ]
})
export class PermissionModule {
}

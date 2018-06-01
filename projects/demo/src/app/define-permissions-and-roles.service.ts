import { Injectable } from '@angular/core';
import { PermissionStore, RoleStore } from 'ng2-permission';

@Injectable()
export class DefinePermissionsAndRolesService {
    constructor(private permissionStore: PermissionStore, private roleStore: RoleStore) { }

    init() {
        this.permissionStore.definePermission('Read', function () {
            return false;
        });
        this.permissionStore.definePermission('Write', function () {
            return true;
        });
        this.permissionStore.definePermission('Delete', function () {
            return false;
        });

        this.roleStore.defineRole('Admin', ['Read', 'Write', 'Delete']);
    }

    enableRead(enabled: boolean) {
        this.permissionStore.definePermission('Read', function () {
            return enabled;
        });
    }
}

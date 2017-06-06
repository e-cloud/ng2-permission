import { Injectable } from '@angular/core';
import { PermissionStore } from '../permission/stores/PermissionStore';
import { RoleStore } from '../permission/stores/RoleStore';

@Injectable()
export class DefinePermissionsAndRolesService {
    constructor(private permissionStore: PermissionStore, private roleStore: RoleStore) { }

    init() {
        this.permissionStore.definePermission('Read', function () {
            return true;
        });
        this.permissionStore.definePermission('Write', function () {
            return true;
        });
        this.permissionStore.definePermission('Delete', function () {
            return true;
        });

        this.roleStore.defineRole('Admin', ['Read', 'Write', 'Delete']);
    }
}

import { Injectable } from '@angular/core'
import PermissionStore from '../stores/PermissionStore'
import RoleStore from '../stores/RoleStore'
import PermissionMap, { RawPermissionMap } from './PermissionMap'

@Injectable()
export default class Authorization {
    constructor(private permissionStore: PermissionStore, private  roleStore: RoleStore) {
    }

    resolve(rpm: RawPermissionMap) {
        const map = new PermissionMap(rpm, this.permissionStore, this.roleStore)

        return map.resolveAll()
    }
}

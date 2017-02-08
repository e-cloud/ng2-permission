import { Injectable } from '@angular/core'
import PermissionStore from '../stores/PermissionStore'
import RoleStore from '../stores/RoleStore'
import PermissionMap, { RawPermissionMap } from './PermissionMap'

@Injectable()
export default class Authorization {
    constructor(private permissionStore: PermissionStore, private  roleStore: RoleStore) {
    }

    genPermMap(rpm: RawPermissionMap) {
        return new PermissionMap(rpm, this.permissionStore, this.roleStore)
    }

    resolve(map: PermissionMap) {
        return map.resolveAll()
    }
}

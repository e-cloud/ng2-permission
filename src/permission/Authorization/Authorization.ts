import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';
import { PermissionMap, RawPermissionMap, ValidateResult } from './PermissionMap';

@Injectable()
export class Authorization {
    constructor(private permissionStore: PermissionStore, private  roleStore: RoleStore) {
    }

    genPermMap(rpm: RawPermissionMap) {
        return new PermissionMap(rpm, this.permissionStore, this.roleStore);
    }

    resolve(map: PermissionMap): Observable<ValidateResult> {
        return map.resolveAll();
    }

    resolveRaw(map: RawPermissionMap) {
        return this.resolve(this.genPermMap(map));
    }

    onChanges() {
        return Observable.zip(this.permissionStore.getChanges(), this.roleStore.getChanges());
    }
}

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { merge, Observable } from 'rxjs';

import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';

import { PermissionMap, RawPermissionMap, ValidateResult } from './PermissionMap';

@Injectable()
export class Authorization {
    constructor(private permissionStore: PermissionStore, private roleStore: RoleStore) {
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
        return merge(this.permissionStore.getChanges(), this.roleStore.getChanges());
    }
}

export function AUTHORIZATION_PROVIDER_FACTORY(parent: Authorization, permissionStore: PermissionStore, roleStore: RoleStore) {
    return parent || new Authorization(permissionStore, roleStore);
}

export const AUTHORIZATION_PROVIDER = {
    // If there is already an Locale available, use that. Otherwise, provide a new one.
    provide: Authorization,
    deps: [[new Optional(), new SkipSelf(), Authorization], PermissionStore, RoleStore],
    useFactory: AUTHORIZATION_PROVIDER_FACTORY,
};

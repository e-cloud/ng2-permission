import { Optional, SkipSelf } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Dictionary, Permission, Validator } from '../models';

export class PermissionStore {
    private store: Dictionary<Permission> = {};
    private eventer$ = new Subject<string>();

    definePermission(permissionName: string, validateFn: Validator) {
        this.store[permissionName] = new Permission(permissionName, validateFn);
        this.eventer$.next();
    }

    definePermissions(permissionNames: string[], validateFn: Validator) {
        permissionNames.forEach(name => this.definePermission(name, validateFn));
    }

    removePermissionDefinition(permissionName: string) {
        this.store[permissionName] = undefined;
        this.eventer$.next();
    }

    hasPermissionDefinition(permissionName: string) {
        return !!this.store[permissionName];
    }

    getPermissionDefinition(permissionName: string) {
        return this.store[permissionName];
    }

    getStore() {
        return this.store;
    }

    clearStore() {
        this.store = {};
        this.eventer$.next();
    }

    getChanges(): Observable<any> {
        return this.eventer$.asObservable();
    }
}

export function PERMISSIONSTORE_PROVIDER_FACTORY(parent: PermissionStore) {
    return parent || new PermissionStore();
}

export const PERMISSIONSTORE_PROVIDER = {
    // If there is already an Locale available, use that. Otherwise, provide a new one.
    provide: PermissionStore,
    deps: [[new Optional(), new SkipSelf(), PermissionStore]],
    useFactory: PERMISSIONSTORE_PROVIDER_FACTORY,
};

import { Optional, SkipSelf } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Dictionary, Role, Validator } from '../models';

export class RoleStore {
    private store: Dictionary<Role> = {};
    private eventer$ = new Subject<string>();

    defineRole(roleName: string, validateFn: Validator | string[]) {
        this.store[roleName] = new Role(roleName, validateFn);
        this.eventer$.next();
    }

    defineRoles(roleNames: string[], validateFn: Validator) {
        roleNames.forEach(name => this.defineRole(name, validateFn));
    }

    removeRoleDefinition(roleName: string) {
        this.store[roleName] = undefined;
        this.eventer$.next();
    }

    hasRoleDefinition(roleName: string) {
        return !!this.store[roleName];
    }

    getRoleDefinition(roleName: string) {
        return this.store[roleName];
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

export function ROLESTORE_PROVIDER_FACTORY(parent: RoleStore) {
    return parent || new RoleStore();
}

export const ROLESTORE_PROVIDER = {
    // If there is already an Locale available, use that. Otherwise, provide a new one.
    provide: RoleStore,
    deps: [[new Optional(), new SkipSelf(), RoleStore]],
    useFactory: ROLESTORE_PROVIDER_FACTORY,
};

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

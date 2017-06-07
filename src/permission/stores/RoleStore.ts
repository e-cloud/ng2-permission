import { Subject } from 'rxjs/Subject';
import { Validator } from '../models/Permission';
import { Role } from '../models/Role';
import { Dictionary } from '../../typings';
import { Observable } from 'rxjs/Observable';

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
        delete this.store[roleName];
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

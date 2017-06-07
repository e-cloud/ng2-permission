import { Subject } from 'rxjs/Subject'
import { Permission, Validator } from '../models/Permission';
import { Dictionary } from '../../typings';
import { Observable } from 'rxjs/Observable';

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
        delete this.store[permissionName];
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

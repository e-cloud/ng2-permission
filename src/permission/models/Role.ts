import { Observable } from 'rxjs/Observable';
import { wrapIntoObservable } from '../Authorization/PermissionMap';
import { PermissionStore } from '../stores/PermissionStore';
import { Validator } from './Permission';

export class Role {
    constructor(
        private name: string,
        private validateFn: Validator | string[]
    ) {
    }

    validate(permissionStore: PermissionStore): Observable<boolean> | Promise<boolean> | boolean {
        if (typeof this.validateFn === 'function') {
            return this.validateFn(this.name)
        } else if (Array.isArray(this.validateFn)) {
            const map = this.validateFn.map((perm) => {
                if (permissionStore.hasPermissionDefinition(perm)) {
                    return wrapIntoObservable(permissionStore.getPermissionDefinition(perm).validate())
                } else {
                    return wrapIntoObservable(false)
                }
            })

            return Observable.forkJoin(...map)
                .map(result => result.every(x => x))
        }

        throw TypeError('Invalid "validateFn", must be string array or function')
    }
}

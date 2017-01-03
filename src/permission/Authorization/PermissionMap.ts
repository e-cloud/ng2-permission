import * as _ from 'lodash'
import RoleStore from '../stores/RoleStore'
import PermissionStore from '../stores/PermissionStore'
import { wrapIntoObservable } from '@angular/router/src/utils/collection'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/first';

interface RedirectRoute {
    path: string
    [prop: string]: any
}

interface RedirectFunc {
    (): RedirectRoute
}

type Redirection = RedirectRoute | RedirectFunc | string | {
    [prop: string]: RedirectRoute | RedirectFunc | string
}

type RedirectMap = {
    default: RedirectFunc
    [prop: string]: RedirectFunc
}

export default class PermissionMap {
    only: string[]
    except: string[]
    redirectTo: RedirectMap

    constructor(
        permissionMap: {
            only?: string[] | string
            except?: string[] | string
            redirectTo?: any
        } = {} as any,
        private permissionStore: PermissionStore,
        private roleStore: RoleStore
    ) {
        this.only = normalizeOnlyAndExceptProperty(permissionMap.only);
        this.except = normalizeOnlyAndExceptProperty(permissionMap.except);
        this.redirectTo = normalizeRedirectToProperty(permissionMap.redirectTo);
    }

    resolvePrivilegesValidity(privileges: string[]): Observable<boolean>[] {
        return privileges.map(privilegeName => {
            if (this.roleStore.hasRoleDefinition(privilegeName)) {
                const role = this.roleStore.getRoleDefinition(privilegeName);
                return wrapIntoObservable(role.validate());
            }

            if (this.permissionStore.hasPermissionDefinition(privilegeName)) {
                const permission = this.permissionStore.getPermissionDefinition(privilegeName);
                return wrapIntoObservable(permission.validate());
            }

            return wrapIntoObservable(false);
        });
    }

    resolveExceptPrivilegeMap() {
        const observableArr = this.resolvePrivilegesValidity(this.except);

        return Observable.forkJoin(observableArr)
            .map(function (result) {
                return !result.every(x => x)
            })

    }


}

function isObjectSingleRedirectionRule(redirectTo: RedirectRoute) {
    return _.isNil(redirectTo.path);
}

function isObjectMultipleRedirectionRule(redirectTo: Dictionary<Redirection>) {
    return _.isNil(redirectTo['default']);
}

function normalizeOnlyAndExceptProperty(property: string | string[]) {
    if (typeof property === 'string') {
        return [property];
    }

    if (Array.isArray(property)) {
        return property;
    }

    return [];
}

function normalizeRedirectToProperty(redirectTo: Redirection) {
    if (typeof redirectTo === 'string') {
        return normalizeStringRedirectionRule(redirectTo);
    }

    if (typeof redirectTo === 'object') {
        if (isObjectSingleRedirectionRule(redirectTo as RedirectRoute)) {
            return normalizeObjectSingleRedirectionRule(redirectTo as RedirectRoute);
        }

        if (isObjectMultipleRedirectionRule(redirectTo)) {
            return normalizeObjectMultipleRedirectionRule(redirectTo);
        }

        throw new TypeError('When used "redirectTo" as object, property "default" must be defined');
    }

    if (_.isFunction(redirectTo)) {
        return normalizeFunctionRedirectionRule(redirectTo);
    }

    return redirectTo
}

function normalizeStringRedirectionRule(redirectTo: string): RedirectMap {
    return {
        default: () => ({
            path: redirectTo
        })
    };
}

function normalizeObjectSingleRedirectionRule(redirectTo: RedirectRoute): RedirectMap {
    return {
        default: () => redirectTo
    };
}

function normalizeObjectMultipleRedirectionRule(redirectTo: Dictionary<Redirection>) {
    const redirectionMap = {} as RedirectMap;

    _.forEach(redirectTo, (redirection: Redirection, permission: string) => {
        if (typeof redirection === 'function') {
            redirectionMap[permission] = redirection;
        }

        if (typeof redirection === 'object') {
            redirectionMap[permission] = () => redirection as RedirectRoute;
        }

        if (typeof redirection === 'string') {
            redirectionMap[permission] = () => ({
                path: redirection
            });
        }
    });

    return redirectionMap;
}

function normalizeFunctionRedirectionRule(redirectTo: RedirectFunc): RedirectMap {
    return {
        default: redirectTo
    };
}

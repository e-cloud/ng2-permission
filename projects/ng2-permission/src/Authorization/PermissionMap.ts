import each from 'lodash-es/each';
import isFunction from 'lodash-es/isFunction';
import isNil from 'lodash-es/isNil';
import isString from 'lodash-es/isString';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { isPromise } from 'rxjs/internal/util/isPromise';
import { map, switchMap } from 'rxjs/operators';

import { Dictionary } from '../models';
import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';

export interface RedirectRoute {
    path: string

    [prop: string]: any
}

export type RedirectFunc = (rejectedPermissionName: string) => RedirectRoute

export type Redirection = RedirectRoute | RedirectFunc | string | {
    [prop: string]: RedirectRoute | RedirectFunc | string;
}

export interface RedirectMap {
    default: RedirectFunc

    [prop: string]: RedirectFunc
}

export interface RawPermissionMap {
    // aka allOf
    only?: string[] | string
    // aka not
    except?: string[] | string
    anyOf?: string[]
    redirectTo?: any
}

export interface ValidateResult {
    valid: boolean;
    permissionName: string | null;
}

export class PermissionMap {
    only: string[];
    anyOf: string[];
    except: string[];
    redirectTo: RedirectMap;

    constructor(
        permissionMap: RawPermissionMap = <any>{},
        private permissionStore: PermissionStore,
        private roleStore: RoleStore,
    ) {
        this.only = normalizeSetOperationProperty(permissionMap.only);
        this.anyOf = normalizeSetOperationProperty(permissionMap.anyOf);
        this.except = normalizeSetOperationProperty(permissionMap.except);
        this.redirectTo = normalizeRedirectToProperty(permissionMap.redirectTo);
    }

    resolvePrivilegesValidity(privileges: string[]): Observable<ValidateResult>[] {
        return privileges.map(privilegeName => {
            if (this.roleStore.hasRoleDefinition(privilegeName)) {
                const role = this.roleStore.getRoleDefinition(privilegeName);
                return wrapIntoObservable(role.validate(this.permissionStore))
                    .pipe(map(result => ({ valid: result, permissionName: privilegeName })));
            }

            if (this.permissionStore.hasPermissionDefinition(privilegeName)) {
                const permission = this.permissionStore.getPermissionDefinition(privilegeName);
                return wrapIntoObservable(permission.validate())
                    .pipe(map(result => ({ valid: result, permissionName: privilegeName })));
            }

            return wrapIntoObservable(false)
                .pipe(map(result => ({ valid: result, permissionName: privilegeName })));
        });
    }

    resolveAll(): Observable<ValidateResult> {
        return this.resolveExceptPrivilegeMap()
            .pipe(switchMap(result => {
                // resolve only privilege when except privilege not granted indeed
                if (result.valid) {
                    return this.resolveOnlyPrivilegeMap();
                }

                return of(result);
            }), switchMap(result => {
                // resolve anyOf privileges when only privileges are granted
                if (result.valid) {
                    return this.resolveAnyOfPrivilegeMap();
                }

                return of(result);
            }));
    }

    resolveRedirect(rejectedPermissionName: string): Observable<RedirectRoute> {
        if (!this.redirectTo) {
            return throwError(new Error('Empty redirect config.'));
        }

        const redirectFunc = this.redirectTo[rejectedPermissionName] || this.redirectTo.default;

        return wrapIntoObservable(redirectFunc(rejectedPermissionName))
            .pipe(map(function (result) {
                if (isString(result)) {
                    return {
                        path: result,
                    };
                }

                if (typeof result === 'object') {
                    return result;
                }

                throw new Error('Invalid redirect config.');
            }));
    }

    resolveExceptPrivilegeMap(): Observable<ValidateResult> {
        if (!this.except.length) {
            return of({ valid: true, permissionName: null });
        }

        const observableArr = this.resolvePrivilegesValidity(this.except);

        return forkJoin(observableArr)
            .pipe(map(function (result) {
                // if user is not granted with any permission specified
                if (result.every(x => !x.valid)) {
                    return { valid: true, permissionName: null };
                }

                // find those permission
                return { ...result.find(x => x.valid), valid: false };
            }));
    }

    resolveOnlyPrivilegeMap(): Observable<ValidateResult> {
        if (!this.only.length) {
            return of({ valid: true, permissionName: null });
        }

        const observableArr = this.resolvePrivilegesValidity(this.only);

        return forkJoin(observableArr)
            .pipe(map(function (result) {
                if (result.every(x => x.valid)) {
                    return { valid: true, permissionName: null };
                }
                return { ...result.find(x => !x.valid), valid: false };
            }));
    }

    resolveAnyOfPrivilegeMap(): Observable<ValidateResult> {
        if (!this.anyOf.length) {
            return of({ valid: true, permissionName: null });
        }

        const observableArr = this.resolvePrivilegesValidity(this.anyOf);

        return forkJoin(observableArr)
            .pipe(map(function (result) {
                if (result.some(x => x.valid)) {
                    return { valid: true, permissionName: null };
                }
                return { valid: false, permissionName: null };
            }));
    }
}

function isObservable(obj: any | Observable<any>): obj is Observable<any> {
    return !!obj && typeof obj.subscribe === 'function';
}

/**
 * wrap various source into observable
 */
export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        return from(value);
    }
    return of(value);
}

function isObjectSingleRedirectionRule(redirectTo: RedirectRoute) {
    return !isNil(redirectTo.path);
}

function normalizeSetOperationProperty(property: string | string[]) {
    if (typeof property === 'string') {
        return [property];
    }

    if (Array.isArray(property)) {
        return property;
    }

    return [];
}

function normalizeRedirectToProperty(redirectTo: Redirection) {
    if (isNil(redirectTo)) {
        return null;
    }

    if (typeof redirectTo === 'string') {
        return normalizeStringRedirectionRule(redirectTo);
    }

    if (typeof redirectTo === 'object') {
        if (isObjectSingleRedirectionRule(<RedirectRoute>redirectTo)) {
            return normalizeObjectSingleRedirectionRule(<RedirectRoute>redirectTo);
        }

        return normalizeObjectMultipleRedirectionRule(redirectTo);
    }

    if (isFunction(redirectTo)) {
        return normalizeFunctionRedirectionRule(redirectTo);
    }

    throw new TypeError('Property "redirectTo" must be String, Function, Array or Object');
}

function normalizeStringRedirectionRule(redirectTo: string): RedirectMap {
    return {
        default: () => ({
            path: redirectTo,
        }),
    };
}

function normalizeObjectSingleRedirectionRule(redirectTo: RedirectRoute): RedirectMap {
    return {
        default: () => redirectTo,
    };
}

function normalizeObjectMultipleRedirectionRule(redirectTo: Dictionary<Redirection>) {
    const redirectionMap: RedirectMap = <any>{};

    each(redirectTo, (redirection: Redirection, permission: string) => {
        if (typeof redirection === 'function') {
            redirectionMap[permission] = redirection;
        }

        if (typeof redirection === 'object') {
            redirectionMap[permission] = () => <RedirectRoute>redirection;
        }

        if (typeof redirection === 'string') {
            redirectionMap[permission] = () => ({
                path: redirection,
            });
        }
    });

    return redirectionMap;
}

function normalizeFunctionRedirectionRule(redirectTo: RedirectFunc): RedirectMap {
    return {
        default: redirectTo,
    };
}

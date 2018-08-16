import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Authorization } from '../Authorization/Authorization';
import { PermissionMap, RawPermissionMap, wrapIntoObservable } from '../Authorization/PermissionMap';
import { getRawMap } from '../utils';

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {
    permissionRejected$: Subject<PermissionMap> = new Subject();

    constructor(private authorize: Authorization, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        const data: any = route.data;

        if (!data.permission) {
            return true;
        }

        return this.checkPermission(data.permission);
    }

    canActivateChild(route: ActivatedRouteSnapshot) {
        return this.canActivate(route);
    }

    checkPermission(perm: string | RawPermissionMap) {
        const permMap = this.authorize.genPermMap(getRawMap(perm));
        return this.authorize.resolve(permMap)
            .pipe(switchMap((result) => {
                if (!result.valid && permMap.redirectTo) {
                    this.permissionRejected$.next(permMap);
                    return permMap.resolveRedirect(result.permissionName)
                        .pipe(
                            take(1),
                            map(redirect => {
                                this.router.navigate([redirect.path]);

                                return false;
                            }),
                        );
                }

                return wrapIntoObservable(result.valid);
            }));
    }
}

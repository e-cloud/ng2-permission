import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap, wrapIntoObservable } from '../Authorization/PermissionMap';
import { getRawMap } from '../utils';

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {

    constructor(private authorize: Authorization, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot
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
            .switchMap((result) => {
                if (!result[0] && permMap.redirectTo) {
                    return permMap.resolveRedirect(result[1])
                        .take(1)
                        .map(redirect => {
                            this.router.navigate([redirect.path]);

                            return false;
                        });
                }

                return wrapIntoObservable(result[0]);
            });
    }
}

import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';

@Pipe({
    name: 'permission',
    pure: false,
})
export class PermissionPipe implements OnDestroy, PipeTransform {
    private permission$ = new BehaviorSubject(false);
    private lastInput: any;

    constructor(private authorizer: Authorization) {}

    ngOnDestroy(): void {
        if (this.permission$) {
            this.permission$.unsubscribe();
        }
    }

    transform(value: string | RawPermissionMap): any {
        if (value !== this.lastInput) {
            this.authorizer.resolveRaw(this.getRawMap(value))
                .take(1)
                .subscribe((result) => {
                    this.permission$.next(result[0]);
                });
        }

        this.lastInput = value;

        return this.permission$;
    }

    private getRawMap(perm: string | RawPermissionMap) {
        const rawMap: RawPermissionMap = {};

        if (typeof perm === 'string') {
            rawMap.only = perm;
        } else if (typeof perm === 'object') {
            Object.assign(rawMap, perm, {
                redirectTo: null
            });
        } else {
            throw new TypeError('Invalid Input for PermissionIfDirective');
        }

        return rawMap;
    }

}

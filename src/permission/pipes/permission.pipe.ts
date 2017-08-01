import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';
import { getRawMap } from '../utils';

@Pipe({
    name: 'permission',
    pure: false,
})
export class PermissionPipe implements OnDestroy, PipeTransform {
    private permission$ = new BehaviorSubject(false);
    private lastInput: any;
    private permissionChanges$: Subscription;

    constructor(private authorizer: Authorization) {
        this.permissionChanges$ = this.authorizer.onChanges()
            .subscribe(() => {
                if (this.lastInput) {
                    this.checkPermission(this.lastInput);
                }
            });
    }

    ngOnDestroy(): void {
        if (this.permission$) {
            this.permission$.unsubscribe();
        }
        this.permissionChanges$.unsubscribe();
    }

    transform(value: string | RawPermissionMap): any {
        if (value !== this.lastInput) {
            this.checkPermission(value);
            this.lastInput = value;
        }

        return this.permission$;
    }

    private checkPermission(value: string | RawPermissionMap) {
        this.authorizer.resolveRaw({ ...getRawMap(value), redirectTo: null })
            .take(1)
            .subscribe((result) => {
                this.permission$.next(result[0]);
            });
    }

}

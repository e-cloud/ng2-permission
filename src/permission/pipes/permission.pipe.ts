import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

    constructor(private authorizer: Authorization) {}

    ngOnDestroy(): void {
        if (this.permission$) {
            this.permission$.unsubscribe();
        }
    }

    transform(value: string | RawPermissionMap): any {
        if (value !== this.lastInput) {
            this.authorizer.resolveRaw({ ...getRawMap(value), redirectTo: null })
                .take(1)
                .subscribe((result) => {
                    this.permission$.next(result[0]);
                });
        }

        this.lastInput = value;

        return this.permission$;
    }

}

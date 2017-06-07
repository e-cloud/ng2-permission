import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';

@Directive({
    selector: '[permissionIf]'
})
export class PermissionIfDirective implements OnChanges {
    private rawMap: RawPermissionMap = {};
    private $state: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authorizer: Authorization
    ) {
    }

    @Input()
    set permissionIf(perm: string | RawPermissionMap) {
        if (typeof perm === 'string') {
            this.rawMap.only = perm;
        } else if (typeof perm === 'object') {
            Object.assign(this.rawMap, perm);
        } else {
            throw new TypeError('Invalid Input for PermissionIfDirective');
        }
    }

    ngOnChanges() {
        this.authorizer.resolve(this.authorizer.genPermMap(this.rawMap))
            .takeWhile(result => result[0] !== this.$state)
            .subscribe((result) => {
                this.$state = result[0];
                this.updateView();
            });
    }

    updateView() {
        if (this.$state) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

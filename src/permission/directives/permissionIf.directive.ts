import { Directive, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';
import { getRawMap } from '../utils';

@Directive({
    selector: '[permissionIf]'
})
export class PermissionIfDirective implements OnInit, OnChanges {
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
        this.rawMap = getRawMap(perm);
    }

    ngOnInit() {
        this.authorizer.onChanges()
            .debounceTime(250)
            .subscribe(() => {
                this.check();
            });
    }

    ngOnChanges() {
        this.check();
    }

    check() {
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

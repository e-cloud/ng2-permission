import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Authorization } from '../Authorization/Authorization';
import { getRawMap } from '../utils';

import { PermissionIfContext, PermissionIfDirective } from './permissionIf.directive';

@Directive({
    selector: '[permissionOnly]',
})
export class PermissionOnlyDirective extends PermissionIfDirective {
    @Input('permissionOnly')
    set permissionIf(perm: string | string[]) {
        this.rawMap = getRawMap({ only: perm });
    }

    @Input('permissionOnlyExternal')
    set permissionIfExternal(condition: boolean) {
        this.setExternalCondition(condition);
        this.setCondition();
    }

    @Input('permissionOnlyThen')
    set permissionIfThen(templateRef: TemplateRef<PermissionIfContext>) {
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null;  // clear previous view if any.
        this.updateView();
    }

    @Input('permissionOnlyElse')
    set permissionIfElse(templateRef: TemplateRef<PermissionIfContext>) {
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null;  // clear previous view if any.
        this.updateView();
    }

    constructor(
        templateRef: TemplateRef<any>,
        viewContainer: ViewContainerRef,
        authorizer: Authorization,
    ) {
        super(templateRef, viewContainer, authorizer);
    }
}

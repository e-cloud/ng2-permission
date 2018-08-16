import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Authorization } from '../Authorization/Authorization';
import { getRawMap } from '../utils';

import { PermissionIfContext, PermissionIfDirective } from './permissionIf.directive';

@Directive({
    selector: '[permissionAnyOf]',
})
export class PermissionAnyOfDirective extends PermissionIfDirective {
    @Input('permissionAnyOf')
    set permissionIf(perm: string[]) {
        this.rawMap = getRawMap({ anyOf: perm });
    }

    @Input('permissionAnyOfExternal')
    set permissionIfExternal(condition: boolean) {
        this.setExternalCondition(condition);
        this.setCondition();
    }

    @Input('permissionAnyOfThen')
    set permissionIfThen(templateRef: TemplateRef<PermissionIfContext>) {
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null;  // clear previous view if any.
        this.updateView();
    }

    @Input('permissionAnyOfElse')
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

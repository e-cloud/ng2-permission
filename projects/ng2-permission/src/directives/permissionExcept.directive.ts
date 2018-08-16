import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Authorization } from '../Authorization/Authorization';
import { getRawMap } from '../utils';

import { PermissionIfContext, PermissionIfDirective } from './permissionIf.directive';

@Directive({
    selector: '[permissionExcept]',
})
export class PermissionExceptDirective extends PermissionIfDirective {
    @Input('permissionExcept')
    set permissionIf(perm: string | string[]) {
        this.rawMap = getRawMap({ except: perm });
    }

    @Input('permissionExceptExternal')
    set permissionIfExternal(condition: boolean) {
        this.setExternalCondition(condition);
        this.setCondition();
    }

    @Input('permissionExceptThen')
    set permissionIfThen(templateRef: TemplateRef<PermissionIfContext>) {
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null;  // clear previous view if any.
        this.updateView();
    }

    @Input('permissionExceptElse')
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

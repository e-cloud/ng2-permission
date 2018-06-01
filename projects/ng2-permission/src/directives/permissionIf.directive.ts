import { Directive, EmbeddedViewRef, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';
import { getRawMap } from '../utils';

// tslint:disable max-classes-per-file
export class PermissionIfContext {
    public $implicit: boolean = null;
    public permissionIf: boolean = null;
    public external: boolean = null;
}

@Directive({
    selector: '[permissionIf]'
})
export class PermissionIfDirective implements OnInit, OnChanges {
    private rawMap: RawPermissionMap = {};
    private _context: PermissionIfContext = new PermissionIfContext();
    private _thenTemplateRef: TemplateRef<PermissionIfContext> | null = null;
    private _elseTemplateRef: TemplateRef<PermissionIfContext> | null = null;
    private _thenViewRef: EmbeddedViewRef<PermissionIfContext> | null = null;
    private _elseViewRef: EmbeddedViewRef<PermissionIfContext> | null = null;

    constructor(
        templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authorizer: Authorization
    ) {
        this._thenTemplateRef = templateRef;
        this.setExternalCondition(true);
        this.setCondition(false);
    }

    @Input()
    set permissionIf(perm: string | RawPermissionMap) {
        this.rawMap = getRawMap(perm);
    }

    @Input()
    set permissionIfExternal(condition: boolean) {
        this.setExternalCondition(condition);
        this.setCondition();
    }

    @Input()
    set permissionIfThen(templateRef: TemplateRef<PermissionIfContext>) {
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null;  // clear previous view if any.
        this.updateView();
    }

    @Input()
    set permissionIfElse(templateRef: TemplateRef<PermissionIfContext>) {
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null;  // clear previous view if any.
        this.updateView();
    }

    ngOnInit() {
        this.authorizer.onChanges()
            .pipe(debounceTime(250))
            .subscribe(() => {
                this.check();
            });
    }

    ngOnChanges() {
        this.check();
    }

    check() {
        this.authorizer.resolve(this.authorizer.genPermMap(this.rawMap))
            .subscribe((result) => {
                this.setCondition(result[0]);
                this.updateView();
            });
    }

    updateView() {
        if (this._context.$implicit) {
            if (!this._thenViewRef) {
                this.viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef =
                        this.viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                }
            }
        } else {
            if (!this._elseViewRef) {
                this.viewContainer.clear();
                this._thenViewRef = null;
                if (this._elseTemplateRef) {
                    this._elseViewRef =
                        this.viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                }
            }
        }
    }

    private setCondition(condition = true) {
        this._context.$implicit = this._context.permissionIf = condition && this._context.external;
    }

    private setExternalCondition(condition: boolean) {
        this._context.external = condition;
    }
}

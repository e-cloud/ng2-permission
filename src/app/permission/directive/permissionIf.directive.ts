import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import Authorization from '../Authorization/Authorization'
import { RawPermissionMap } from '../Authorization/PermissionMap'

@Directive({
    selector: '[permissionIf]'
})
export class PermissionIfDirective {
    private rawMap: RawPermissionMap = {}
    private $state: boolean

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authorizer: Authorization
    ) {
    }

    @Input() set permissionIfExcept(except: string|string[]) {
        this.rawMap.except = except
    }

    @Input() set permissionIfOnly(only: string|string[]) {
        this.rawMap.only = only
    }

    ngOnChanges() {
        this.authorizer.resolve(this.rawMap)
            .subscribe((result: boolean) => {
                this.$state = result
                this.updateView()
            })
    }

    updateView() {
        if (this.$state) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    }
}

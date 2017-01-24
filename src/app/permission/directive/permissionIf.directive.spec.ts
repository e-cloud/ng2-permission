/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { PermissionModule } from '../permission.module'
import RoleStore from '../stores/RoleStore'
import PermissionStore from '../stores/PermissionStore'

@Component({
    template: `
    <template permissionIf [permissionIfExcept]="'Read'">
      <h2>Except</h2>
    </template>`
})
class TestComponent {
}

describe('PermissionIfDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let elemSet: DebugElement[];  // the three elements w/ the directive

    let roleStore: RoleStore;
    let permissionStore: PermissionStore;
    let _read = true;
    let _write = true;
    let _delete = true;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PermissionModule],
            declarations: [TestComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })

        _read = true;
        _write = true;
        _delete = true;

        permissionStore = TestBed.get(PermissionStore)
        permissionStore.definePermission('Read', function () {
            return _read
        })
        permissionStore.definePermission('Write', function () {
            return _write
        })
        permissionStore.definePermission('Delete', function () {
            return _delete
        })

        roleStore = TestBed.get(RoleStore)

        roleStore.defineRole('Admin', ['Read', 'Write', 'Delete'])

        fixture = TestBed.createComponent(TestComponent);
    });

    it('should remove permissionIf elements', () => {
        _read = true
        fixture.detectChanges();
        elemSet = fixture.debugElement.queryAll(By.css('h2'));
        expect(elemSet.length).toBe(0);
    });

    it('should render permissionIf elements', () => {
        _read = false
        fixture.detectChanges();
        elemSet = fixture.debugElement.queryAll(By.css('h2'));
        expect(elemSet.length).toBe(1);
    });
});

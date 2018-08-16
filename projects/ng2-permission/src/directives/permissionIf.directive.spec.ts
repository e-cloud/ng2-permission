// tslint:disable:no-implicit-dependencies
/* tslint:disable:no-unused-variable */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PermissionModule } from '../permission.module';
import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';

@Component({
    template: `
        <h2 *permissionIf="perm">Show with permission</h2>
        <h3 *permissionIf="perm; external: externalCondition">show with external condition</h3>
    `,
})
class TestHostComponent {
    perm = {
        except: 'Read',
    };
    externalCondition = true;
}

describe('PermissionIfDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let elemSet: DebugElement[];

    let roleStore: RoleStore;
    let permissionStore: PermissionStore;
    let _read = true;
    let _write = true;
    let _delete = true;
    let testHost: any = null;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PermissionModule.forRoot()],
            declarations: [TestHostComponent],
        });

        _read = true;
        _write = true;
        _delete = true;

        permissionStore = TestBed.get(PermissionStore);
        permissionStore.definePermission('Read', function () {
            return Promise.resolve(_read);
        });
        permissionStore.definePermission('Write', function () {
            return _write;
        });
        permissionStore.definePermission('Delete', function () {
            return _delete;
        });

        roleStore = TestBed.get(RoleStore);

        roleStore.defineRole('Admin', ['Read', 'Write', 'Delete']);

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.externalCondition = true;
    });

    it('should remove permissionIf elements with static permission', async(() => {
        _read = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h2'));
            expect(elemSet.length).toBe(0);
        });
    }));

    it('should remove permissionIf elements with string input permission', async(() => {
        _write = false;
        testHost = fixture.componentInstance;
        testHost.perm = 'Write';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h2'));
            expect(elemSet.length).toBe(0);
        });
    }));

    it('should remove permissionIf elements with static permission and dynamic config', async(() => {
        _write = false;
        testHost = fixture.componentInstance;
        testHost.perm = {
            only: 'Write',
        };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h2'));
            expect(elemSet.length).toBe(0);

            testHost.perm = 'Write';
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                elemSet = fixture.debugElement.queryAll(By.css('h2'));
                expect(elemSet.length).toBe(0);
            });
        });
    }));

    it('should render permissionIf elements with static permission', async(() => {
        _read = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h2'));
            expect(elemSet.length).toBe(1);
        });
    }));

    it('should render permissionIf elements with static permission and dynamic config', async(() => {
        _read = true;
        testHost = fixture.componentInstance;
        testHost.perm = {
            only: 'Read',
        };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h2'));
            expect(elemSet.length).toBe(1);

            testHost.perm = 'Read';
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                elemSet = fixture.debugElement.queryAll(By.css('h2'));
                expect(elemSet.length).toBe(1);
            });
        });
    }));

    it('should remove permissionIf elements with `true` external condition', async(() => {
        _read = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h3'));
            expect(elemSet.length).toBe(1);
        });
    }));

    it('should render permissionIf elements with `true` external condition', async(() => {
        _read = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h3'));
            expect(elemSet.length).toBe(0);
        });
    }));

    it('should remove permissionIf elements with `false` external condition', async(() => {
        _read = false;
        fixture.componentInstance.externalCondition = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h3'));
            expect(elemSet.length).toBe(0);
        });
    }));

    it('should render permissionIf elements with `false` external condition', async(() => {
        _read = true;
        fixture.componentInstance.externalCondition = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            elemSet = fixture.debugElement.queryAll(By.css('h3'));
            expect(elemSet.length).toBe(0);
        });
    }));
});

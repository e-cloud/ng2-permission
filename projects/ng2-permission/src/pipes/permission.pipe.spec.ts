// tslint:disable:no-implicit-dependencies
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, Observer, of } from 'rxjs';

import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';

import { PermissionPipe } from './permission.pipe';

@Component({
    template: `
        <h1 id="header" *ngIf="'Admin' | permission | async">hello</h1>
        <h2 id="header2">world</h2>
    `,
})
export class TestComponent {
}

// tslint:disable-next-line:max-classes-per-file
class FakeAuthorization {
    constructor(private callback: Function) {
    }

    onChanges() {
        return of(null);
    }

    resolveRaw(map: RawPermissionMap) {
        return Observable.create((observer: Observer<boolean>) => {
            setTimeout(() => {
                observer.next(this.callback(map));
                observer.complete();
            }, 50);
        });
    }
}

describe('PermissionPipe', () => {
    let fixture: ComponentFixture<TestComponent>;
    let showElement = true;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {
                    provide: Authorization,
                    useFactory() {
                        return new FakeAuthorization(function () {
                            return { valid: showElement, permissionName: null };
                        });
                    },
                },
            ],
            declarations: [
                TestComponent,
                PermissionPipe,
            ],
        });

        fixture = TestBed.createComponent(TestComponent);
    });

    it('create an instance', () => {
        // tslint:disable-next-line:no-object-literal-type-assertion
        const pipe = new PermissionPipe(<Authorization>{ onChanges: () => of(null) });
        expect(pipe).toBeTruthy();
    });

    it('validate to permission and cause the target element unrendered', async(() => {
        showElement = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const component = fixture.debugElement.query(By.css('#header'));

            expect(!!component).toBe(false);
        });
    }));

    it('validate to permission and make the target element rendered', async(() => {
        showElement = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const component = fixture.debugElement.query(By.css('#header'));

            expect(!!component).toBe(true);
        });
    }));
});

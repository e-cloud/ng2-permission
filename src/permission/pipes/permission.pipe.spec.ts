import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Authorization } from '../Authorization/Authorization';
import { RawPermissionMap } from '../Authorization/PermissionMap';
import { PermissionPipe } from './permission.pipe';

@Component({
    template: `
        <h1 id="header" *ngIf="'Admin' | permission | async">hello</h1>
        <h2 id="header2">world</h2>
    `
})
export class TestComponent {
}

class FakeAuthorization {
    constructor(private callback: Function) {

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
                            return showElement;
                        });
                    }
                }
            ],
            declarations: [
                TestComponent,
                PermissionPipe,
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
    });

    it('create an instance', () => {
        const pipe = new PermissionPipe(null);
        expect(pipe).toBeTruthy();
    });

    it('validate to permission and cause the target element unrendered', () => {
        showElement = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const component = fixture.debugElement.query(By.css('#header'));

            expect(!!component).toBe(false);
        });
    });

    it('validate to permission and make the target element rendered', () => {
        showElement = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const component = fixture.debugElement.query(By.css('#header'));

            expect(!!component).toBe(true);
        });
    });
});

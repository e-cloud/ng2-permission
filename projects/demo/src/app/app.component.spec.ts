/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DefinePermissionsAndRolesService } from './define-permissions-and-roles.service';
import { BrowserModule } from '@angular/platform-browser';
import { PermissionModule } from 'ng2-permission';

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserModule,
                PermissionModule.forRoot(),
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                DefinePermissionsAndRolesService,
            ]
        });
        TestBed.compileComponents();
    });

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));

    it('should render title in a h1 tag', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('app works!');
    }));
});

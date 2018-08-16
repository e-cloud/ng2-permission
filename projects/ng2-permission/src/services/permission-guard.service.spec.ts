// tslint:disable:no-implicit-dependencies
/* tslint:disable:no-unused-variable */
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PermissionModule } from '../permission.module';
import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';

import { PermissionGuard } from './permission-guard.service';

@Component({
    template: `
        <router-outlet></router-outlet>
    `,
})
export class RoutingComponent {
}

// tslint:disable:max-classes-per-file
@Component({
    template: 'Test Component',
})
export class HomeComponent {
}

@Component({
    template: '404 Component',
})
export class PageNotFoundComponent {
}

@Component({
    template: 'Test Login',
})
export class LoginComponent {
}

describe('PermissionGuard', () => {
    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<RoutingComponent>;
    let roleStore: RoleStore;
    let permissionStore: PermissionStore;
    let _accessHome = true;
    let _suspect = true;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                PermissionModule.forRoot(),
                RouterTestingModule.withRoutes([
                    { path: 'login', component: LoginComponent },
                    { path: '404', component: PageNotFoundComponent },
                    {
                        path: 'home',
                        canActivate: [PermissionGuard],
                        component: HomeComponent,
                        data: {
                            permission: {
                                only: 'Admin',
                                except: 'Suspect',
                            },
                        },
                    },
                    {
                        path: 'home2',
                        canActivate: [PermissionGuard],
                        component: HomeComponent,
                        data: {
                            permission: {
                                only: 'Admin',
                                except: 'Suspect',
                                redirectTo: '/404',
                            },
                        },
                    },
                ]),
            ],
            providers: [PermissionGuard],
            declarations: [
                RoutingComponent,
                HomeComponent,
                LoginComponent,
                PageNotFoundComponent,
            ],
        });

        _accessHome = false;
        _suspect = false;

        permissionStore = TestBed.get(PermissionStore);
        permissionStore.definePermission('AccessHome', function () {
            return _accessHome;
        });

        permissionStore.definePermission('Suspect', function () {
            return _suspect;
        });

        roleStore = TestBed.get(RoleStore);

        roleStore.defineRole('Admin', ['AccessHome']);

        fixture = TestBed.createComponent(RoutingComponent);
    });

    beforeEach(async(inject([Router, Location], (_router: Router, _location: Location) => {
        location = _location;
        router = _router;
        return router.navigate(['/login']);
    })));

    it('should not route to home without permission', async(() => {
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/login');
        });
    }));

    it('should route to home with permission', async(() => {
        _accessHome = true;
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/home');
        });
    }));

    it('should route to login without enough permissions', async(() => {
        _accessHome = true;
        _suspect = true;
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/login');
        });
    }));

    it('should route to 404 with redirect config', async(() => {
        _accessHome = true;
        _suspect = true;
        router.navigate(['/home2']).then(() => {
            setTimeout(function () {
                expect(location.path()).toBe('/404');
            });
        });
    }));
});

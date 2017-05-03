/* tslint:disable:no-unused-variable */
import { TestBed, inject, ComponentFixture, async } from '@angular/core/testing'
import { Location } from '@angular/common'
import { PermissionGuard } from './permission-guard.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import RoleStore from '../stores/RoleStore'
import PermissionStore from '../stores/PermissionStore'
import { PermissionModule } from '../permission.module'

@Component({
    template: `
    <router-outlet></router-outlet>
  `
})
class RoutingComponent {
}

@Component({
    template: 'Test Component'
})
class HomeComponent {
}

@Component({
    template: 'Test Login'
})
class LoginComponent {
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
                    {
                        path: 'home',
                        canActivate: [PermissionGuard],
                        component: HomeComponent,
                        data: {
                            permission: {
                                only: 'Admin',
                                except: 'Suspect'
                            }
                        }
                    }
                ])
            ],
            providers: [PermissionGuard],
            declarations: [RoutingComponent, HomeComponent, LoginComponent]
        });

        _accessHome = false;
        _suspect = false;

        permissionStore = TestBed.get(PermissionStore)
        permissionStore.definePermission('AccessHome', function () {
            return _accessHome
        })

        permissionStore.definePermission('Suspect', function () {
            return _suspect
        })

        roleStore = TestBed.get(RoleStore)

        roleStore.defineRole('Admin', ['AccessHome'])

        fixture = TestBed.createComponent(RoutingComponent);
    });

    beforeEach(async(inject([Router, Location], (_router: Router, _location: Location) => {
        location = _location;
        router = _router;
        return router.navigate(['/login'])
    })));

    it('should not route to home without permission', async(() => {
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/login');
        });
    }));

    it('should route to home with permission', async(() => {
        _accessHome = true
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/home');
        });
    }));

    it('should route to home with more permissions', async(() => {
        _accessHome = true
        _suspect = true
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/login');
        });
    }));
});

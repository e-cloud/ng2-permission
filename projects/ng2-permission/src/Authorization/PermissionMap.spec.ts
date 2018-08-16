// tslint:disable:no-implicit-dependencies
import { async } from '@angular/core/testing';

import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';

import { PermissionMap } from './PermissionMap';

describe('PermissionMap', () => {
    let roleStore: RoleStore;
    let permissionStore: PermissionStore;

    const PERM_WRITE = 'Write'
    const PERM_READ = 'Read'
    const PERM_DELETE = 'Delete'
    const PERM_EXEC = 'Execute'

    let _read: boolean;
    let _write: boolean;
    let _delete: boolean;
    let _execute: boolean;

    beforeEach(() => {
        _read = true;
        _write = true;
        _delete = true;
        _execute = true;

        permissionStore = new PermissionStore();
        permissionStore.definePermission(PERM_READ, function () {
            return _read;
        });
        permissionStore.definePermission(PERM_WRITE, function () {
            return _write;
        });
        permissionStore.definePermission(PERM_DELETE, function () {
            return _delete;
        });
        permissionStore.definePermission(PERM_EXEC, function () {
            return _execute;
        });

        roleStore = new RoleStore();

        roleStore.defineRole('Admin', [PERM_READ, PERM_WRITE, PERM_DELETE]);
    });

    it('should create from string', async(function () {
        const map = new PermissionMap({
            except: PERM_WRITE,
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });

        _write = false;

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });
    }));

    it('should create from string array', async(function () {
        const map = new PermissionMap({
            except: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });

        _write = false;

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });
    }));

    it('should validate with empty map', async(function () {
        let map = new PermissionMap({
            except: [],
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        map = new PermissionMap({
            only: [],
        }, permissionStore, roleStore);

        map.resolveOnlyPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });
    }));

    it('should validate except rule', async(function () {
        const map = new PermissionMap({
            except: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });

        _write = false;

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });
    }));

    it('should validate only rule', async(function () {
        const map = new PermissionMap({
            only: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveOnlyPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _write = false;

        map.resolveOnlyPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });
    }));

    it('should validate anyOf rule', async(function () {
        const map = new PermissionMap({
            anyOf: [PERM_WRITE, PERM_READ],
        }, permissionStore, roleStore);

        map.resolveAnyOfPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _write = true;
        _read = false;

        map.resolveAnyOfPrivilegeMap()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _write = false;

        map.resolveAnyOfPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: null });
            });
    }));

    it('should validate except and only both', async(function () {
        const map = new PermissionMap({
            except: [PERM_READ],
            only: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_READ });
            });

        _read = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _write = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });
    }));

    it('should validate only and anyOf both', async(function () {
        const map = new PermissionMap({
            anyOf: [PERM_READ, PERM_DELETE],
            only: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _read = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _delete = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(false);
            });

        _delete = true;
        _write = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });
    }));

    it('should validate except and anyOf both', async(function () {
        const map = new PermissionMap({
            anyOf: [PERM_READ, PERM_DELETE],
            except: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });

        _write = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _delete = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _read = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: null });
            });
    }));

    it('should validate only, except and anyOf all', async(function () {
        const map = new PermissionMap({
            anyOf: [PERM_READ, PERM_DELETE],
            only: [PERM_EXEC],
            except: [PERM_WRITE],
        }, permissionStore, roleStore);

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_WRITE });
            });

        _write = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _execute = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: PERM_EXEC });
            });

        _execute = true;
        _delete = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result.valid).toBe(true);
            });

        _read = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual({ valid: false, permissionName: null });
            });
    }));
});

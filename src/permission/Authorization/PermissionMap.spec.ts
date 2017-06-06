import { async } from '@angular/core/testing';
import { PermissionStore } from '../stores/PermissionStore';
import { RoleStore } from '../stores/RoleStore';
import { PermissionMap } from './PermissionMap';

describe('PermissionMap', () => {
    let roleStore: RoleStore;
    let permissionStore: PermissionStore;
    let _read = true;
    let _write = true;
    let _delete = true;

    beforeEach(() => {
        _read = true;
        _write = true;
        _delete = true;

        permissionStore = new PermissionStore();
        permissionStore.definePermission('Read', function () {
            return _read;
        });
        permissionStore.definePermission('Write', function () {
            return _write;
        });
        permissionStore.definePermission('Delete', function () {
            return _delete;
        });

        roleStore = new RoleStore();

        roleStore.defineRole('Admin', ['Read', 'Write', 'Delete']);
    });

    it('should create from string', async(function () {
        const map = new PermissionMap({
            except: 'Write'
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual([false, 'Write']);
            });

        _write = false;

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });
    }));

    it('should create from string array', async(function () {
        const map = new PermissionMap({
            except: ['Write']
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual([false, 'Write']);
            });

        _write = false;

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });
    }));

    it('should validate with empty map', async(function () {
        let map = new PermissionMap({
            except: []
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });

        map.resolveAll()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });

        map = new PermissionMap({
            only: []
        }, permissionStore, roleStore);

        map.resolveOnlyPrivilegeMap()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });

        map.resolveAll()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });
    }));

    it('should validate except', async(function () {
        const map = new PermissionMap({
            except: ['Write']
        }, permissionStore, roleStore);

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual([false, 'Write']);
            });

        _write = false;

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });
    }));

    it('should validate only', async(function () {
        const map = new PermissionMap({
            only: ['Write']
        }, permissionStore, roleStore);

        map.resolveOnlyPrivilegeMap()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });

        _write = false;

        map.resolveOnlyPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toEqual([false, 'Write']);
            });
    }));

    it('should validate except and only both', async(function () {
        const map = new PermissionMap({
            except: ['Read'],
            only: ['Write']
        }, permissionStore, roleStore);

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual([false, 'Read']);
            });

        _read = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result[0]).toBe(true);
            });

        _write = false;

        map.resolveAll()
            .subscribe(function (result) {
                expect(result).toEqual([false, 'Write']);
            });
    }));
});

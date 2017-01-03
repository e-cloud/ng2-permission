import PermissionMap from './PermissionMap'
import RoleStore from '../stores/RoleStore'
import PermissionStore from '../stores/PermissionStore'
import { async } from '@angular/core/testing'

describe('PermissionMap', () => {
    let roleStore: RoleStore;
    let permissionStore: PermissionStore;
    let _read = true;
    let _write = true;
    let _delete = true;

    beforeEach(() => {
        permissionStore = new PermissionStore()
        permissionStore.definePermission('Read', function () {
            return _read
        })
        permissionStore.definePermission('Write', function () {
            return _write
        })
        permissionStore.definePermission('Delete', function () {
            return _delete
        })

        roleStore = new RoleStore(permissionStore)

        roleStore.defineRole('Admin', ['Read', 'Write', 'Delete'])
    })

    it('should create from string', async(function () {
        const map = new PermissionMap({
            except: 'Write'
        }, permissionStore, roleStore)


        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toBe(false)
            })

        _write = false

        map.resolveExceptPrivilegeMap()
            .subscribe(function (result) {
                expect(result).toBe(true)
            })
    }))
})

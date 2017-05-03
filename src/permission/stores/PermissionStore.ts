import Permission, { Validator } from '../models/Permission'

export default class PermissionStore {
    private store: Dictionary<Permission> = {}

    definePermission(permissionName: string, validateFn: Validator) {
        this.store[permissionName] = new Permission(permissionName, validateFn)
    }

    definePermissions(permissionNames: string[], validateFn: Validator) {
        permissionNames.forEach(name => this.definePermission(name, validateFn))
    }

    removePermissionDefinition(permissionName: string) {
        delete this.store[permissionName]
    }

    hasPermissionDefinition(permissionName: string) {
        return !!this.store[permissionName]
    }

    getPermissionDefinition(permissionName: string) {
        return this.store[permissionName]
    }

    getStore() {
        return this.store
    }

    clearStore() {
        this.store = {}
    }
}

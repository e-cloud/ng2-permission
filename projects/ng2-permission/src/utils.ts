import isString from 'lodash-es/isString';

import { RawPermissionMap } from './Authorization/PermissionMap';

/**
 * to generate a valid RawPermissionMap
 */
export function getRawMap(perm: string | string[] | RawPermissionMap) {
    const rawMap: RawPermissionMap = {};

    if (isString(perm) || Array.isArray(perm)) {
        rawMap.only = perm;
    } else if (typeof perm === 'object') {
        Object.assign(rawMap, perm);
    } else {
        throw new TypeError('Invalid Input. Should be string or RawPermissionMap');
    }

    return rawMap;
}

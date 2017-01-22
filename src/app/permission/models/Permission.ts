import { Observable } from 'rxjs'

export interface Validator {
    (id: string): Observable<boolean> | Promise<boolean> | boolean
}

export default class Permission {
    constructor(private name: string, private validateFn: Validator){
    }

    validate() {
       return this.validateFn(this.name)
    }
}
